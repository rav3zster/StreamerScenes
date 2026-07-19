import React, { useState, useEffect } from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

function formatTime(formatType: '12h' | '24h', showSeconds: boolean): string {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
    hour12: formatType === '12h',
  });
}

/**
 * ClockWidget — live clock.
 * Ticks in both editor and output so users can verify it works.
 */
export const ClockWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  const settings = content.settings || {};
  const formatType = settings.format ?? '12h';
  const showSeconds = settings.showSeconds !== false;

  const [time, setTime] = useState(() => formatTime(formatType, showSeconds));

  useEffect(() => {
    setTime(formatTime(formatType, showSeconds));
    const id = setInterval(() => setTime(formatTime(formatType, showSeconds)), 1000);
    return () => clearInterval(id);
  }, [formatType, showSeconds]);

  return (
    <div style={buildBaseStyle(s)}>
      <span style={{ ...buildTextStyle(s, zoom), textAlign: s.textAlign ?? 'center' }}>
        {time}
      </span>
    </div>
  );
};
