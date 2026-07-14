import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

interface PollOption {
  label: string;
  votes: number;
}

/** PollWidget — displays a poll with vote percentages. */
export const PollWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  const question: string = content.settings?.question ?? 'Which is your favorite?';
  const options: PollOption[] = content.settings?.options ?? [
    { label: 'Option A', votes: 48 },
    { label: 'Option B', votes: 30 },
    { label: 'Option C', votes: 22 },
  ];
  const total = options.reduce((sum, o) => sum + o.votes, 0) || 1;

  return (
    <div
      style={{
        ...buildBaseStyle(s),
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: `${8 * zoom}px`,
        padding: `${(s.padding ?? 14) * zoom}px`,
      }}
    >
      <span
        style={{
          ...buildTextStyle(s, zoom),
          fontSize: `${(s.fontSize ?? 13) * zoom}px`,
          fontWeight: '700',
          marginBottom: `${4 * zoom}px`,
        }}
      >
        {question}
      </span>
      {options.map((opt, i) => {
        const pct = Math.round((opt.votes / total) * 100);
        return (
          <div key={i} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: `${2 * zoom}px` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ ...buildTextStyle(s, zoom), fontSize: `${(s.fontSize ?? 11) * zoom}px` }}>
                {opt.label}
              </span>
              <span style={{ ...buildTextStyle(s, zoom), fontSize: `${(s.fontSize ?? 11) * zoom}px`, opacity: 0.7 }}>
                {pct}%
              </span>
            </div>
            <div style={{ width: '100%', height: `${6 * zoom}px`, background: 'rgba(255,255,255,0.1)', borderRadius: `${99}px` }}>
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: s.fontColor ?? '#3b82f6',
                  borderRadius: `${99}px`,
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
