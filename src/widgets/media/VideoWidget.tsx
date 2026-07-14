import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

/**
 * VideoWidget — handles: video, game-capture.
 * Renders a <video> element if a src is provided, otherwise a placeholder.
 */
export const VideoWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  const { style: s, content, type } = widget;
  const src: string | undefined = content.settings?.src;

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
        src={src}
        autoPlay
        loop={content.settings?.loop ?? true}
        muted={content.settings?.muted ?? true}
        playsInline
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
