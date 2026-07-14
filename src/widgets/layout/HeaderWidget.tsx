import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

export const HeaderWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  const p = (s.padding ?? 16) * zoom;
  return (
    <div
      style={{
        ...buildBaseStyle(s),
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${(s.padding ?? 12) * zoom}px ${p}px`,
      }}
    >
      <span
        style={{
          ...buildTextStyle(s, zoom),
          fontSize: `${(s.fontSize ?? 14) * zoom}px`,
          fontWeight: '700',
          textAlign: 'left',
        }}
      >
        {content.settings?.titleText ?? 'Stream Title'}
      </span>
    </div>
  );
};
