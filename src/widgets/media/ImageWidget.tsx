import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

/**
 * ImageWidget — handles: image, gif.
 * Renders an <img> when a URL is provided.
 * Falls back to a styled placeholder in editor mode.
 */
export const ImageWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  const { style: s, content, type } = widget;
  const src: string | undefined = content.settings?.src;

  if (!src) {
    // Editor placeholder
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
        <span style={{ fontSize: `${24 * zoom}px` }}>{type === 'gif' ? '🎞' : '🖼'}</span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: `${10 * zoom}px`,
            color: 'rgba(168,85,247,0.6)',
            fontWeight: '600',
          }}
        >
          {type === 'gif' ? 'GIF' : 'Image'}
        </span>
      </div>
    );
  }

  return (
    <div style={{ ...buildBaseStyle(s), padding: 0 }}>
      <img
        src={src}
        alt={widget.label}
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
