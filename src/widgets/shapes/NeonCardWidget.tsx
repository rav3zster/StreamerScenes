import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

/**
 * NeonCardWidget — handles: neon-card, glass-card.
 * Both are styled containers with optional inner label.
 */
export const NeonCardWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  return (
    <div style={buildBaseStyle(s)}>
      {content.settings?.text && (
        <span style={buildTextStyle(s, zoom)}>{content.settings.text}</span>
      )}
    </div>
  );
};
