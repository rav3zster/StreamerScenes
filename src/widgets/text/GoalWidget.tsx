import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

/**
 * GoalWidget — goal-counter / goal-bar.
 * Renders a labelled progress bar.
 */
export const GoalWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  const current = content.settings?.current ?? 42;
  const target  = content.settings?.target  ?? 100;
  const label   = content.settings?.label   ?? 'Follower Goal';
  const pct     = Math.min(100, Math.round((current / target) * 100));

  return (
    <div
      style={{
        ...buildBaseStyle(s),
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: `${6 * zoom}px`,
        padding: `${(s.padding ?? 12) * zoom}px`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <span style={{ ...buildTextStyle(s, zoom), fontSize: `${(s.fontSize ?? 12) * zoom}px` }}>
          {label}
        </span>
        <span
          style={{
            ...buildTextStyle(s, zoom),
            fontSize: `${(s.fontSize ?? 12) * zoom}px`,
            opacity: 0.7,
          }}
        >
          {current}/{target}
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: `${8 * zoom}px`,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: `${99 * zoom}px`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: s.fontColor ?? '#10b981',
            borderRadius: `${99 * zoom}px`,
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  );
};
