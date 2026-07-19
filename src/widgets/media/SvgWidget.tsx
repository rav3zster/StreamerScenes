import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

/**
 * SvgWidget — handles rendering raw SVG markup or SVG files via URL.
 */
export const SvgWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  const { style: s, content } = widget;
  const settings = content.settings || {};
  const sourceType = settings.sourceType ?? 'url';
  const url = settings.src ?? settings.url;
  const rawSvg = settings.rawSvg;

  if (sourceType === 'raw' && rawSvg) {
    return (
      <div
        style={{
          ...buildBaseStyle(s),
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
        dangerouslySetInnerHTML={{ __html: rawSvg }}
      />
    );
  }

  if (sourceType === 'url' && url) {
    return (
      <div style={{ ...buildBaseStyle(s), padding: 0 }}>
        <img
          src={url}
          alt={widget.label}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    );
  }

  // Labeled Placeholder in Editor Mode
  if (animated) {
    return <div style={{ ...buildBaseStyle(s), background: 'transparent' }} />;
  }

  return (
    <div
      style={{
        ...buildBaseStyle(s),
        border: `${2 * zoom}px dashed rgba(168,85,247,0.35)`,
        flexDirection: 'column',
        gap: `${6 * zoom}px`,
        background: 'rgba(168,85,247,0.04)',
      }}
    >
      <span style={{ fontSize: `${24 * zoom}px` }}>▲</span>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: `${10 * zoom}px`,
          color: 'rgba(168,85,247,0.6)',
          fontWeight: '600',
        }}
      >
        SVG Graphic
      </span>
    </div>
  );
};
