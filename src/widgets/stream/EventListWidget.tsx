import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

interface EventEntry {
  icon: string;
  user: string;
  action: string;
}

const MOCK_EVENTS: EventEntry[] = [
  { icon: '❤️', user: 'neon_rider',   action: 'just followed' },
  { icon: '⭐', user: 'CyberFox',     action: 'subscribed (Tier 1)' },
  { icon: '💸', user: 'nightstream99', action: 'donated $5.00' },
  { icon: '❤️', user: 'vibe_watch',   action: 'just followed' },
  { icon: '⭐', user: 'StreamQueen',  action: 'gifted 3 subs' },
];

/**
 * EventListWidget — event-list, donation-feed.
 */
export const EventListWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s } = widget;

  return (
    <div
      style={{
        ...buildBaseStyle(s),
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: `${8 * zoom}px`,
        padding: `${(s.padding ?? 12) * zoom}px`,
        overflow: 'hidden',
      }}
    >
      {MOCK_EVENTS.slice(0, 5).map((e, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: `${6 * zoom}px`,
            alignItems: 'center',
            padding: `${4 * zoom}px ${8 * zoom}px`,
            borderRadius: `${6 * zoom}px`,
            background: 'rgba(255,255,255,0.04)',
            width: '100%',
          }}
        >
          <span style={{ fontSize: `${13 * zoom}px`, flexShrink: 0 }}>{e.icon}</span>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span
              style={{
                fontFamily: s.fontFamily ?? 'Inter, sans-serif',
                fontSize: `${(s.fontSize ?? 12) * zoom}px`,
                fontWeight: '700',
                color: s.fontColor ?? '#ffffff',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {e.user}
            </span>
            <span
              style={{
                fontFamily: s.fontFamily ?? 'Inter, sans-serif',
                fontSize: `${(s.fontSize ?? 10) * zoom}px`,
                color: `${s.fontColor ?? '#ffffff'}80`,
              }}
            >
              {e.action}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
