import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

/**
 * ViewerCountWidget — displays simulated viewer count.
 * Reads from content.settings.count or shows a placeholder.
 */
export const ViewerCountWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  const count: number = content.settings?.count ?? 1234;
  return (
    <div style={{ ...buildBaseStyle(s), gap: `${8 * zoom}px`, flexDirection: 'row' }}>
      <span style={{ ...buildTextStyle(s, zoom), fontSize: `${(s.fontSize ?? 14) * zoom}px` }}>
        👁
      </span>
      <span style={{ ...buildTextStyle(s, zoom), fontFamily: s.fontFamily ?? 'JetBrains Mono, monospace' }}>
        {count.toLocaleString()}
      </span>
    </div>
  );
};
