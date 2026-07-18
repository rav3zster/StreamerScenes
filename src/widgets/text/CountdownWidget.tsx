import React, { useState, useEffect } from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';
import { useEditorStore, getTimerRemaining } from '../../store/editorStore';

/**
 * CountdownWidget — countdown-timer widget.
 * In live/preview runtimes, it derives time locally using Date.now() and trigger completion behaviors.
 */
export const CountdownWidget: React.FC<WidgetProps> = ({ widget, zoom, animated, timerSource = 'preview' }) => {
  const { style: s } = widget;

  const timer = useEditorStore(state => 
    timerSource === 'live' ? state.liveTimer : state.previewTimer
  );
  
  const finishTimer = useEditorStore(state => 
    timerSource === 'live' ? state.finishLiveTimer : state.finishPreviewTimer
  );

  const [remaining, setRemaining] = useState(() => getTimerRemaining(timer));

  // Sync remaining with timer runtime state shifts
  useEffect(() => {
    setRemaining(getTimerRemaining(timer));
  }, [timer]);

  // Live countdown derived locally when running
  useEffect(() => {
    if (!timer.isRunning || timer.isFinished || !animated) {
      return;
    }

    const interval = setInterval(() => {
      const cur = getTimerRemaining(timer);
      setRemaining(cur);
      
      if (cur <= 0) {
        clearInterval(interval);
        finishTimer();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [timer.isRunning, timer.isFinished, animated, finishTimer]);

  // Handle "hide" finish behavior in final/preview rendering
  if (timer.isFinished && timer.finishBehavior === 'hide' && animated) {
    return null;
  }

  // Check if finished text replacement should render
  const isFinishedText = timer.isFinished && (timer.finishBehavior === 'replace-text' || timer.finishBehavior === 'switch-scene');

  const minutes = Math.floor(remaining / 60);
  const seconds = Math.round(remaining % 60);
  
  // Guard formatting overflows (e.g. 60 seconds rounding)
  const adjustedSec = seconds === 60 ? 0 : seconds;
  const adjustedMin = seconds === 60 ? minutes + 1 : minutes;

  const display = isFinishedText
    ? (timer.replaceText || 'FINISHED')
    : `${String(adjustedMin).padStart(2, '0')}:${String(adjustedSec).padStart(2, '0')}`;

  const animStyle: React.CSSProperties = {};
  if (isFinishedText && animated) {
    if (timer.replaceTransition === 'fade') animStyle.animation = 'fade-in 0.5s ease-out forwards';
    if (timer.replaceTransition === 'zoom') animStyle.animation = 'zoom-in 0.5s ease-out forwards';
    if (timer.replaceTransition === 'slide') animStyle.animation = 'slide-up 0.5s ease-out forwards';
  }

  return (
    <div style={buildBaseStyle(s)}>
      <span
        style={{
          ...buildTextStyle(s, zoom),
          textAlign: s.textAlign ?? 'center',
          fontFamily: s.fontFamily ?? 'JetBrains Mono, monospace',
          display: 'block',
          ...animStyle,
        }}
      >
        {display}
      </span>
    </div>
  );
};
