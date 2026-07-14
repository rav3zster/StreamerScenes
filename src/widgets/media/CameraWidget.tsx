import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';
import { buildBoxShadow } from '../../renderer/styleHelpers';

/**
 * CameraWidget — camera-frame.
 * Renders an overlay frame that sits on top of an OBS camera source.
 * The widget itself is transparent in the center with a styled border/glow.
 */
export const CameraWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  return (
    <div
      style={{
        ...buildBaseStyle(s),
        background: 'transparent',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      }}
    >
      {/* Frame label */}
      {content.settings?.frameLabel && (
        <div
          style={{
            position: 'absolute',
            bottom: `${8 * zoom}px`,
            left: `${8 * zoom}px`,
            background: s.background ?? 'rgba(0,0,0,0.6)',
            padding: `${3 * zoom}px ${8 * zoom}px`,
            borderRadius: `${4 * zoom}px`,
            fontFamily: s.fontFamily ?? 'JetBrains Mono, monospace',
            fontSize: `${(s.fontSize ?? 11) * zoom}px`,
            fontWeight: '700',
            color: s.fontColor ?? '#ffffff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
          }}
        >
          {content.settings.frameLabel}
        </div>
      )}
    </div>
  );
};
