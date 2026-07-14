import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

export const DividerWidget: React.FC<WidgetProps> = ({ widget }) => {
  const { style: s } = widget;
  return (
    <div
      style={{
        ...buildBaseStyle(s),
        background: s.background ?? 'rgba(168,85,247,0.5)',
      }}
    />
  );
};
