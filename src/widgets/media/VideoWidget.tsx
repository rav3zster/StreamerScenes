import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

// Cache playheads at the module level so they persist between mounts/unmounts
const playbackPositions = new Map<string, number>();

/**
 * VideoWidget — handles: video, game-capture.
 * Renders a <video> element if a src is provided, otherwise a placeholder.
 */
export const VideoWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  const { style: s, content, type } = widget;
  const src: string | undefined = content.settings?.src || content.settings?.url;
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const loop = content.settings?.loop !== false;
  const muted = content.settings?.muted !== false;
  const playPolicy = content.settings?.playPolicy ?? 'restart';

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !animated) return;

    if (playPolicy === 'resume' || playPolicy === 'pause') {
      const savedTime = playbackPositions.get(widget.id);
      if (savedTime !== undefined) {
        video.currentTime = savedTime;
      }
    } else {
      playbackPositions.delete(widget.id);
    }

    return () => {
      if (video) {
        if (playPolicy === 'resume' || playPolicy === 'pause') {
          playbackPositions.set(widget.id, video.currentTime);
        }
      }
    };
  }, [widget.id, playPolicy, animated]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!animated) return;
    const video = e.currentTarget;
    if (playPolicy === 'resume' || playPolicy === 'pause') {
      playbackPositions.set(widget.id, video.currentTime);
    }
  };

  if (!src) {
    if (animated) return <div style={{ ...buildBaseStyle(s), background: '#000' }} />;
    return (
      <div
        style={{
          ...buildBaseStyle(s),
          background: '#050505',
          border: `${2 * zoom}px dashed rgba(168,85,247,0.3)`,
          flexDirection: 'column',
          gap: `${6 * zoom}px`,
        }}
      >
        <span style={{ fontSize: `${28 * zoom}px` }}>
          {type === 'game-capture' ? '🎮' : '📹'}
        </span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: `${10 * zoom}px`,
            color: 'rgba(168,85,247,0.6)',
            fontWeight: '600',
          }}
        >
          {type === 'game-capture' ? 'Game Capture' : 'Video'}
        </span>
      </div>
    );
  }

  return (
    <div style={{ ...buildBaseStyle(s), padding: 0 }}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop={loop}
        muted={muted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        style={{
          width: '100%',
          height: '100%',
          objectFit: content.settings?.objectFit ?? 'cover',
          borderRadius: s.borderRadius ? `${s.borderRadius}px` : undefined,
        }}
      />
    </div>
  );
};
