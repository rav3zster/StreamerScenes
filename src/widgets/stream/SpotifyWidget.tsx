import React from 'react';
import type { WidgetProps } from '../types';
import { buildBaseStyle, buildTextStyle } from '../../renderer/styleHelpers';

/** SpotifyWidget — now playing display. */
export const SpotifyWidget: React.FC<WidgetProps> = ({ widget, zoom }) => {
  const { style: s, content } = widget;
  const track  = content.settings?.trackName  ?? 'Chill Synthwave Mix';
  const artist = content.settings?.artistName ?? 'Various Artists';

  return (
    <div
      style={{
        ...buildBaseStyle(s),
        flexDirection: 'row',
        gap: `${10 * zoom}px`,
        alignItems: 'center',
        padding: `${(s.padding ?? 12) * zoom}px`,
      }}
    >
      {/* Album art placeholder */}
      <div
        style={{
          width: `${40 * zoom}px`,
          height: `${40 * zoom}px`,
          borderRadius: `${6 * zoom}px`,
          background: 'linear-gradient(135deg, #1ed760 0%, #1aa34a 100%)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${18 * zoom}px`,
        }}
      >
        🎵
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: `${2 * zoom}px`, minWidth: 0 }}>
        <span
          style={{
            ...buildTextStyle(s, zoom),
            fontSize: `${(s.fontSize ?? 14) * zoom}px`,
            fontWeight: '700',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {track}
        </span>
        <span
          style={{
            ...buildTextStyle(s, zoom),
            fontSize: `${(s.fontSize ?? 11) * zoom}px`,
            color: `${s.fontColor ?? '#ffffff'}80`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {artist}
        </span>
      </div>
    </div>
  );
};
