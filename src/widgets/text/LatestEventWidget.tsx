import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

/**
 * LatestEventWidget — handles: latest-follower, latest-subscriber, latest-donation.
 * Shows a label + username from content.settings.
 */
export const LatestEventWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content, type } = widget;

  const defaultLabel =
    type === 'latest-subscriber' ? 'Latest Subscriber' :
    type === 'latest-donation'   ? 'Latest Donation'   :
                                   'Latest Follower';

  const label    = content.settings?.label    ?? defaultLabel;
  const username = content.settings?.username ?? 'StreamFan99';

  return (
    <div style={{ ...buildBaseStyle(s), flexDirection: 'column', gap: `${4 * zoom}px`, alignItems: 'flex-start', padding: `${(s.padding ?? 12) * zoom}px` }}>
      <span
        style={{
          fontFamily: s.fontFamily ?? 'Inter, sans-serif',
          fontSize: `${(s.fontSize ?? 10) * zoom}px`,
          fontWeight: '600',
          color: s.fontColor ? `${s.fontColor}99` : 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </span>
      <span style={{ ...buildTextStyle(s, zoom), fontSize: `${(s.fontSize ?? 14) * zoom}px`, fontWeight: '700' }}>
        {username}
      </span>
    </div>
  );
};
