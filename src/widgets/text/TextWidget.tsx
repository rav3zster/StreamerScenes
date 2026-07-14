import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

/**
 * TextWidget — handles: text, animated-text, typing-text, now-playing-text
 * All are text-display widgets with no special runtime behavior in the editor.
 * The animated-text / typing-text variants will be handled by CSS animation
 * in the output renderer via the animation field.
 */
export const TextWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  return (
    <div style={buildBaseStyle(s)}>
      <span
        style={{
          ...buildTextStyle(s, zoom),
          textAlign: s.textAlign ?? 'center',
        }}
      >
        {content.settings?.text ?? 'Your Text Here'}
      </span>
    </div>
  );
};
