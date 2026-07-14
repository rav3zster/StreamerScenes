import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

/**
 * AlertsWidget — placeholder for stream alerts (follows, subs, donations).
 * In the final product this will be driven by a WebSocket service.
 * For now it shows a visual placeholder so the user can position the zone.
 */
export const AlertsWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  const { style: s } = widget;

  if (animated) {
    return <div style={{ ...buildBaseStyle(s), background: 'transparent', border: 'none' }} />;
  }

  return (
    <div
      style={{
        ...buildBaseStyle(s),
        background: 'rgba(245,158,11,0.05)',
        border: `${2 * zoom}px dashed rgba(245,158,11,0.3)`,
        flexDirection: 'column',
        gap: `${6 * zoom}px`,
      }}
    >
      <span style={{ fontSize: `${28 * zoom}px` }}>🔔</span>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: `${10 * zoom}px`,
          color: 'rgba(245,158,11,0.6)',
          fontWeight: '600',
          letterSpacing: '0.05em',
        }}
      >
        Alert Zone
      </span>
    </div>
  );
};
