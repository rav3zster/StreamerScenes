import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle } from '../../renderer/styleHelpers';

const SOCIAL_ICONS: Record<string, string> = {
  twitch:    '🟣',
  twitter:   '🐦',
  youtube:   '🔴',
  discord:   '👾',
  instagram: '📷',
  tiktok:    '🎵',
};

/**
 * SocialLinksWidget — horizontal row of social platform icons + handle text.
 */
export const SocialLinksWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;

  const links: Array<{ platform: string; handle: string }> =
    content.settings?.links ?? [
      { platform: 'twitch',  handle: '/yourchannel' },
      { platform: 'twitter', handle: '@yourhandle' },
      { platform: 'discord', handle: 'discord.gg/xyz' },
    ];

  return (
    <div style={{ ...buildBaseStyle(s), flexDirection: 'row', gap: `${14 * zoom}px`, justifyContent: 'center', flexWrap: 'wrap' }}>
      {links.map((l, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: `${4 * zoom}px` }}>
          <span style={{ fontSize: `${16 * zoom}px` }}>{SOCIAL_ICONS[l.platform] ?? '🔗'}</span>
          <span
            style={{
              fontFamily: s.fontFamily ?? 'Inter, sans-serif',
              fontSize: `${(s.fontSize ?? 13) * zoom}px`,
              color: s.fontColor ?? '#ffffff',
              fontWeight: '600',
            }}
          >
            {l.handle}
          </span>
        </div>
      ))}
    </div>
  );
};
