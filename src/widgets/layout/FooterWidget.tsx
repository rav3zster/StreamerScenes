import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

export const FooterWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  return (
    <div
      style={{
        ...buildBaseStyle(s),
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${(s.padding ?? 10) * zoom}px ${(s.padding ?? 16) * zoom}px`,
      }}
    >
      <span
        style={{
          ...buildTextStyle(s, zoom),
          fontSize: `${(s.fontSize ?? 13) * zoom}px`,
          textAlign: 'left',
        }}
      >
        {content.settings?.titleText ?? 'Footer Text'}
      </span>
    </div>
  );
};
