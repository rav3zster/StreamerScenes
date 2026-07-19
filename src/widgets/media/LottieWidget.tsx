import React, { useEffect } from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

/**
 * LottieWidget — loads and renders Lottie json animation files via CDN player.
 */
export const LottieWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  const { style: s, content } = widget;
  const settings = content.settings || {};
  const src = settings.src ?? settings.url;
  const loop = settings.loop !== false;
  const autoplay = settings.autoplay !== false;

  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('lottie-player-script')) {
      const script = document.createElement('script');
      script.id = 'lottie-player-script';
      script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
      document.head.appendChild(script);
    }
  }, []);

  if (!src) {
    if (animated) return <div style={{ ...buildBaseStyle(s), background: 'transparent' }} />;
    return (
      <div
        style={{
          ...buildBaseStyle(s),
          border: `${2 * zoom}px dashed rgba(168,85,247,0.35)`,
          flexDirection: 'column',
          gap: `${6 * zoom}px`,
          background: 'rgba(168,85,247,0.04)',
        }}
      >
        <span style={{ fontSize: `${24 * zoom}px` }}>🌀</span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: `${10 * zoom}px`,
            color: 'rgba(168,85,247,0.6)',
            fontWeight: '600',
          }}
        >
          Lottie Anim
        </span>
      </div>
    );
  }

  if (animated) {
    // Custom elements (like lottie-player) rendered as HTML to avoid React 19 JSX TS definitions check
    const playerHtml = `<lottie-player
      src="${src}"
      background="transparent"
      speed="1"
      style="width: 100%; height: 100%;"
      ${loop ? 'loop' : ''}
      ${autoplay ? 'autoplay' : ''}
    ></lottie-player>`;

    return (
      <div
        style={{ ...buildBaseStyle(s), padding: 0 }}
        dangerouslySetInnerHTML={{ __html: playerHtml }}
      />
    );
  }

  // Labeled Placeholder in Editor Mode
  return (
    <div
      style={{
        ...buildBaseStyle(s),
        border: `${1.5 * zoom}px dashed rgba(168,85,247,0.25)`,
        flexDirection: 'column',
        gap: `${6 * zoom}px`,
        background: 'rgba(168,85,247,0.04)',
      }}
    >
      <span style={{ fontSize: `${24 * zoom}px` }}>🌀</span>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: `${10 * zoom}px`,
          color: 'rgba(168,85,247,0.5)',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        Lottie: {widget.label}
      </span>
    </div>
  );
};
