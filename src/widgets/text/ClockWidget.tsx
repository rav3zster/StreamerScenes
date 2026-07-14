import React, { useState, useEffect } from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

function formatTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

/**
 * ClockWidget — live clock.
 * Ticks in both editor and output so users can verify it works.
 */
export const ClockWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s } = widget;
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={buildBaseStyle(s)}>
      <span style={{ ...buildTextStyle(s, zoom), textAlign: s.textAlign ?? 'center' }}>
        {time}
      </span>
    </div>
  );
};
