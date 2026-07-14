import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

/**
 * AvatarWidget — avatar-frame.
 * Renders a circular/rounded frame for streamer profile pictures.
 */
export const AvatarWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  const { style: s, content } = widget;
  const src: string | undefined = content.settings?.src;

  return (
    <div style={{ ...buildBaseStyle(s), padding: 0 }}>
      {src ? (
        <img
          src={src}
          alt={widget.label}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: s.borderRadius ? `${s.borderRadius}px` : '50%',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'rgba(168,85,247,0.15)',
            borderRadius: s.borderRadius ? `${s.borderRadius}px` : '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${32 * zoom}px`,
          }}
        >
          {animated ? '' : '🧑'}
        </div>
      )}
    </div>
  );
};
