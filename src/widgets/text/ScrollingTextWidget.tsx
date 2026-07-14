import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

/**
 * ScrollingTextWidget — ticker/marquee banner.
 * Uses CSS animation for scrolling. In the editor this still scrolls
 * so the user can see the effect.
 */
export const ScrollingTextWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  return (
    <div style={{ ...buildBaseStyle(s), overflow: 'hidden' }}>
      <div
        style={{
          ...buildTextStyle(s, zoom),
          whiteSpace: 'nowrap',
          animation: 'ticker-scroll 20s linear infinite',
          display: 'inline-block',
          padding: `0 ${100 * zoom}px`,
        }}
      >
        {content.settings?.text ?? '📢 Stream Ticker Text • Welcome! • Follow for more!'}
      </div>
    </div>
  );
};
