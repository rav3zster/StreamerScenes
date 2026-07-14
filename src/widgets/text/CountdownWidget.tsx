import React, { useState, useEffect } from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

/**
 * CountdownWidget — countdown-timer widget.
 * In output mode (animated=true) it counts down in real time from `duration`.
 * In editor mode it shows the static duration value as a preview.
 */
export const CountdownWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  const { style: s, content } = widget;
  const initialSeconds: number = content.settings?.duration ?? 600;

  const [remaining, setRemaining] = useState(initialSeconds);

  const isPaused = !!content.settings?.paused;

  // Sync remaining with initialSeconds when duration changes
  useEffect(() => {
    setRemaining(initialSeconds);
  }, [initialSeconds]);

  // Live countdown only in output mode when not paused
  useEffect(() => {
    if (!animated || isPaused) {
      return;
    }
    const interval = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [animated, isPaused]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div style={buildBaseStyle(s)}>
      <span
        style={{
          ...buildTextStyle(s, zoom),
          textAlign: s.textAlign ?? 'center',
          fontFamily: s.fontFamily ?? 'JetBrains Mono, monospace',
        }}
      >
        {display}
      </span>
    </div>
  );
};
