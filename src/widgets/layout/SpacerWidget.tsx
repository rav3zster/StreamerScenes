import React from 'react';
import type { WidgetProps } from '../types';

export const SpacerWidget: React.FC<WidgetProps> = ({ widget }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: 'transparent',
      // Dashed outline in editor only (animated=false means editor context)
      border: !widget.animation ? '1px dashed rgba(255,255,255,0.1)' : 'none',
    }}
  />
);
