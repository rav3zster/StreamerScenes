import React from 'react';
import type { WidgetProps } from './types';

/**
 * FallbackWidget — rendered when a WidgetType has no registered component.
 * Shows a diagnostic label in editor mode, nothing in output mode.
 */
export const FallbackWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  if (animated) return null;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        border: `${1.5 * zoom}px dashed rgba(239,68,68,0.4)`,
        background: 'rgba(239,68,68,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: `${4 * zoom}px`,
        borderRadius: `${4 * zoom}px`,
      }}
    >
      <span style={{ fontSize: `${10 * zoom}px`, color: 'rgba(239,68,68,0.6)', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700' }}>
        Unknown type
      </span>
      <span style={{ fontSize: `${9 * zoom}px`, color: 'rgba(239,68,68,0.4)', fontFamily: 'JetBrains Mono, monospace' }}>
        {widget.type}
      </span>
    </div>
  );
};
