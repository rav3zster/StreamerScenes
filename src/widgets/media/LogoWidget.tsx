import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

/** LogoWidget — renders a text-based logo or image logo. */
export const LogoWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  const src: string | undefined = content.settings?.src;
  const logoText: string = content.settings?.text ?? '⚡ VibeOverlay';

  if (src) {
    return (
      <div style={{ ...buildBaseStyle(s), padding: 0 }}>
        <img
          src={src}
          alt={widget.label}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    );
  }

  return (
    <div style={buildBaseStyle(s)}>
      <span
        style={{
          ...buildTextStyle(s, zoom),
          fontSize: `${(s.fontSize ?? 28) * zoom}px`,
          fontWeight: '800',
          textAlign: 'center',
        }}
      >
        {logoText}
      </span>
    </div>
  );
};
