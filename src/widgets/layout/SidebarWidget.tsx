import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

export const SidebarWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s } = widget;
  return (
    <div
      style={{
        ...buildBaseStyle(s),
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: `${(s.padding ?? 16) * zoom}px`,
      }}
    />
  );
};
