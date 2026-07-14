import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

/**
 * ShapeWidget — handles: shape, line, glow-effect, corner-decoration, particles.
 * These are purely visual decorative elements.
 */
export const ShapeWidget: React.FC<WidgetProps> = ({ widget }) => {
  const { style: s, type } = widget;

  if (type === 'glow-effect') {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: s.background ?? 'radial-gradient(circle,rgba(168,85,247,0.4) 0%,transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
    );
  }

  if (type === 'corner-decoration') {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', top: 0, left: 0,
            borderTop: `3px solid ${s.borderColor ?? s.fontColor ?? '#5cffe2'}`,
            borderLeft: `3px solid ${s.borderColor ?? s.fontColor ?? '#5cffe2'}`,
            width: '40%', height: '40%',
            boxShadow: s.glowBlur ? `0 0 ${s.glowBlur}px ${s.glowColor ?? '#5cffe2'}` : undefined,
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: 0, right: 0,
            borderBottom: `3px solid ${s.borderColor ?? s.fontColor ?? '#5cffe2'}`,
            borderRight: `3px solid ${s.borderColor ?? s.fontColor ?? '#5cffe2'}`,
            width: '40%', height: '40%',
            boxShadow: s.glowBlur ? `0 0 ${s.glowBlur}px ${s.glowColor ?? '#5cffe2'}` : undefined,
          }}
        />
      </div>
    );
  }

  if (type === 'particles') {
    // Simple CSS particles via pseudo-elements aren't feasible inline.
    // Render a subtle animated gradient as a stand-in.
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: s.background ?? 'transparent',
          borderRadius: s.borderRadius ? `${s.borderRadius}px` : undefined,
        }}
      />
    );
  }

  // Default: shape / line
  return <div style={buildBaseStyle(s)} />;
};
