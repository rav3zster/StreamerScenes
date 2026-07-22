import React, { useState, useEffect } from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

interface MockMessage {
  user: string;
  text: string;
  color: string;
}

const MOCK_MESSAGES: MockMessage[] = [
  { user: 'StreamFan42',  text: 'POG that was insane!',        color: 'var(--color-accent)' },
  { user: 'NightOwl99',   text: 'LUL LUL LUL',                color: '#5cffe2' },
  { user: 'VibeMaster',   text: 'first time watching, love it!', color: '#f472b6' },
  { user: 'retro_racer',  text: 'clip it clip it!!',            color: '#f59e0b' },
  { user: 'glitchwave',   text: 'GGs this run was perfect',     color: '#ec4899' },
  { user: 'catviewer',    text: ':) nice stream',                color: '#10b981' },
];

const MESSAGES_BANK: MockMessage[] = [
  ...MOCK_MESSAGES,
  { user: 'SpeedRunner',  text: 'Sub 4 minute run incoming?',    color: '#3b82f6' },
  { user: 'ModSquad',     text: 'Be nice in chat guys',         color: '#ef4444' },
  { user: 'lurker_101',   text: 'Just lurking, gl gl',          color: '#7c6fa0' },
  { user: 'hype_train',   text: 'HYPE HYPE HYPE HYPE',          color: '#10b981' },
  { user: 'pixel_art',    text: 'love the screen overlay!',     color: '#f59e0b' },
  { user: 'soundwave',    text: 'music is fire',                color: '#8b5cf6' },
];

/**
 * ChatBoxWidget — renders a simulated chat feed.
 */
export const ChatBoxWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  const { style: s, content } = widget;
  const max = content.settings?.maxMessages ?? 8;
  const [messages, setMessages] = useState<MockMessage[]>(() => MOCK_MESSAGES.slice(0, max));

  useEffect(() => {
    if (!animated) {
      setMessages(MOCK_MESSAGES.slice(0, max));
      return;
    }

    const interval = setInterval(() => {
      const randomMsg = MESSAGES_BANK[Math.floor(Math.random() * MESSAGES_BANK.length)];
      setMessages(prev => {
        const next = [...prev, randomMsg];
        if (next.length > max) {
          next.shift();
        }
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [animated, max]);

  return (
    <div
      style={{
        ...buildBaseStyle(s),
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        gap: `${6 * zoom}px`,
        padding: `${(s.padding ?? 12) * zoom}px`,
        overflow: 'hidden',
      }}
    >
      {messages.map((m, i) => (
        <div key={i} style={{ display: 'flex', gap: `${5 * zoom}px`, alignItems: 'flex-start', maxWidth: '100%' }}>
          <span
            style={{
              fontFamily: s.fontFamily ?? 'Inter, sans-serif',
              fontSize: `${(s.fontSize ?? 13) * zoom}px`,
              fontWeight: '700',
              color: m.color,
              flexShrink: 0,
              lineHeight: 1.4,
            }}
          >
            {m.user}:
          </span>
          <span
            style={{
              ...buildTextStyle(s, zoom),
              fontSize: `${(s.fontSize ?? 13) * zoom}px`,
              color: s.fontColor ?? '#e5e5e5',
              lineHeight: 1.4,
              textAlign: 'left',
            }}
          >
            {m.text}
          </span>
        </div>
      ))}
    </div>
  );
};
