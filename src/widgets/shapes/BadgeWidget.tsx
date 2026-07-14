import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

/** BadgeWidget — pill-shaped label/tag. */
export const BadgeWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  const text = content.settings?.badgeText ?? content.settings?.text ?? widget.label;

  return (
    <div style={{ ...buildBaseStyle(s), borderRadius: s.borderRadius ? `${s.borderRadius}px` : `${99}px` }}>
      <span
        style={{
          ...buildTextStyle(s, zoom),
          fontSize: `${(s.fontSize ?? 13) * zoom}px`,
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        {text}
      </span>
    </div>
  );
};
