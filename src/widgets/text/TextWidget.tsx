import React, { useState, useEffect } from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

/**
 * TextWidget — handles: text, animated-text, typing-text, now-playing-text
 */
export const TextWidget: React.FC<WidgetProps> = ({ widget, zoom, animated }) => {
  const { style: s, content, type } = widget;
  const fullText = content.settings?.text ?? 'Your Text Here';
  const [typedText, setTypedText] = useState(type === 'typing-text' && animated ? '' : fullText);

  useEffect(() => {
    if (type !== 'typing-text' || !animated) {
      setTypedText(fullText);
      return;
    }

    let index = 0;
    let isCancelled = false;
    setTypedText('');

    const tick = () => {
      if (isCancelled) return;
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index < fullText.length) {
        setTimeout(tick, 70);
      } else {
        // Loop typing animation after a delay
        setTimeout(() => {
          if (isCancelled) return;
          index = 0;
          setTypedText('');
          setTimeout(tick, 200);
        }, 3000);
      }
    };

    const initialTimeout = setTimeout(tick, 150);

    return () => {
      isCancelled = true;
      clearTimeout(initialTimeout);
    };
  }, [fullText, type, animated]);

  return (
    <div style={buildBaseStyle(s)}>
      <span
        style={{
          ...buildTextStyle(s, zoom),
          textAlign: s.textAlign ?? 'center',
          whiteSpace: 'pre-wrap',
        }}
      >
        {typedText}
      </span>
    </div>
  );
};
