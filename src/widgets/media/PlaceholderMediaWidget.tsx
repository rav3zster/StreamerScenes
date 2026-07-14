import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

const PLACEHOLDER_CONFIG: Record<string, { icon: string; label: string }> = {
  lottie:  { icon: '🌀', label: 'Lottie Animation' },
  svg:     { icon: '▲',  label: 'SVG Graphic'      },
  vtuber:  { icon: '🎭', label: 'VTuber Layer'      },
};

/**
 * PlaceholderMediaWidget — lottie, svg, vtuber.
 * These are external source types that don't have in-browser renderers yet.
 * In output mode: renders as transparent (invisible, OBS handles the source).
 * In editor mode: renders a labeled placeholder so the user can position it.
 */
export const PlaceholderMediaWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  const { style: s, type } = widget;
  const cfg = PLACEHOLDER_CONFIG[type] ?? { icon: '?', label: type };

  if (animated) {
    return <div style={{ ...buildBaseStyle(s), background: 'transparent', border: 'none' }} />;
  }

  return (
    <div
      style={{
        ...buildBaseStyle(s),
        background: 'rgba(168,85,247,0.04)',
        border: `${1.5 * zoom}px dashed rgba(168,85,247,0.25)`,
        flexDirection: 'column',
        gap: `${6 * zoom}px`,
      }}
    >
      <span style={{ fontSize: `${24 * zoom}px` }}>{cfg.icon}</span>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: `${10 * zoom}px`,
          color: 'rgba(168,85,247,0.5)',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {cfg.label}
      </span>
    </div>
  );
};
