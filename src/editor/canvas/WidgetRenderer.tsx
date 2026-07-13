import React from 'react';
import type { SceneWidget } from '../../store/editorStore';

interface Props {
  widget: SceneWidget;
  zoom: number;
}

export const WidgetRenderer: React.FC<Props> = ({ widget, zoom }) => {
  const { type, style, content, width, height } = widget;
  const s = style;

  const baseStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background: s.background ?? 'transparent',
    borderRadius: s.borderRadius ? `${s.borderRadius}px` : undefined,
    border: s.borderSize && s.borderSize > 0
      ? `${s.borderSize}px ${s.borderStyle ?? 'solid'} ${s.borderColor ?? 'rgba(168,85,247,0.5)'}`
      : undefined,
    boxShadow: buildBoxShadow(s),
    padding: s.padding ? `${s.padding}px` : undefined,
    backdropFilter: s.glassEffect ? 'blur(12px) saturate(160%)' : undefined,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  };

  const textStyle: React.CSSProperties = {
    fontFamily: s.fontFamily ?? 'Inter, sans-serif',
    fontSize: s.fontSize ? `${s.fontSize * zoom}px` : `${14 * zoom}px`,
    fontWeight: s.fontWeight ?? '400',
    fontStyle: s.fontStyle ?? 'normal',
    color: s.fontColor ?? '#ffffff',
    textAlign: s.textAlign ?? 'left',
    letterSpacing: s.letterSpacing ? `${s.letterSpacing}px` : undefined,
    lineHeight: s.lineHeight ?? 1.4,
    textTransform: s.textTransform ?? 'none',
    textShadow: buildTextShadow(s),
    WebkitTextStroke: s.strokeWidth && s.strokeWidth > 0 ? `${s.strokeWidth * zoom}px ${s.strokeColor ?? '#000000'}` : undefined,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    width: '100%',
    overflow: 'hidden',
  };

  switch (type) {
    // ── Layout ────────────────────────────────────────────────────────────────
    case 'background':
      return <div style={baseStyle} />;

    case 'header':
    case 'footer':
      return (
        <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'space-between', padding: `${(s.padding ?? 12) * zoom}px ${(s.padding ?? 16) * zoom}px` }}>
          <span style={{ ...textStyle, fontSize: `${(s.fontSize ?? 14) * zoom}px`, fontWeight: '700', textAlign: 'left' }}>
            {content.settings?.titleText ?? (type === 'header' ? 'Stream Title' : 'Footer Text')}
          </span>
        </div>
      );

    case 'container':
    case 'glass-panel':
    case 'glass-card':
    case 'neon-card':
      return <div style={baseStyle}>{content.settings?.text && <span style={textStyle}>{content.settings.text}</span>}</div>;

    case 'sidebar':
      return <div style={{ ...baseStyle, flexDirection: 'column', alignItems: 'flex-start', padding: `${(s.padding ?? 16) * zoom}px` }} />;

    case 'divider':
    case 'line':
      return <div style={{ ...baseStyle, background: s.background ?? 'rgba(168,85,247,0.5)' }} />;

    case 'spacer':
      return <div style={{ ...baseStyle, background: 'transparent', border: '1px dashed rgba(255,255,255,0.1)' }} />;

    // ── Text ──────────────────────────────────────────────────────────────────
    case 'text':
    case 'animated-text':
    case 'typing-text':
    case 'now-playing-text':
      return (
        <div style={baseStyle}>
          <span style={{ ...textStyle, textAlign: s.textAlign ?? 'center' }}>
            {content.settings?.text ?? 'Your Text Here'}
          </span>
        </div>
      );

    case 'scrolling-text':
      return (
        <div style={{ ...baseStyle, overflow: 'hidden' }}>
          <div style={{ ...textStyle, whiteSpace: 'nowrap', animation: 'ticker-scroll 20s linear infinite', display: 'inline-block', padding: '0 100px' }}>
            {content.settings?.text ?? '📢 Stream Ticker Text • Welcome! • Follow for more!'}
          </div>
          <style>{`@keyframes ticker-scroll { from { transform: translateX(100vw); } to { transform: translateX(-100%); } }`}</style>
        </div>
      );

    case 'countdown-timer':
    case 'clock': {
      const seconds = content.settings?.duration ?? 600;
      const m = Math.floor(seconds / 60);
      const s2 = seconds % 60;
      const display = type === 'clock' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : `${String(m).padStart(2, '0')}:${String(s2).padStart(2, '0')}`;
      return (
        <div style={baseStyle}>
          <span style={{ ...textStyle, textAlign: s.textAlign ?? 'center', fontFamily: s.fontFamily ?? 'JetBrains Mono, monospace' }}>
            {display}
          </span>
        </div>
      );
    }

    case 'viewer-count':
      return (
        <div style={{ ...baseStyle, flexDirection: 'column', gap: 2 }}>
          <span style={{ ...textStyle, fontSize: `${(s.fontSize ?? 22) * zoom}px`, fontWeight: '700', textAlign: 'center' }}>1,234</span>
          <span style={{ ...textStyle, fontSize: `${9 * zoom}px`, color: 'rgba(255,255,255,0.4)', textAlign: 'center', letterSpacing: 2, textTransform: 'uppercase' }}>Viewers</span>
        </div>
      );

    case 'latest-follower':
    case 'latest-subscriber':
    case 'latest-donation': {
      const label = content.settings?.label ?? (type === 'latest-follower' ? 'Latest Follower' : type === 'latest-subscriber' ? 'Latest Subscriber' : 'Latest Donation');
      const name = type === 'latest-donation' ? '$5.00 from StreamFan99' : 'StreamFan99';
      return (
        <div style={{ ...baseStyle, flexDirection: 'column', alignItems: 'flex-start', padding: `${(s.padding ?? 10) * zoom}px` }}>
          <span style={{ fontSize: `${8 * zoom}px`, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>{label}</span>
          <span style={{ ...textStyle, fontSize: `${(s.fontSize ?? 16) * zoom}px`, fontWeight: '600' }}>{name}</span>
        </div>
      );
    }

    case 'goal-counter':
    case 'goal-bar': {
      const progress = content.settings?.progress ?? 65;
      return (
        <div style={{ ...baseStyle, flexDirection: 'column', gap: `${4 * zoom}px`, padding: `${(s.padding ?? 10) * zoom}px`, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: `${11 * zoom}px`, color: 'rgba(255,255,255,0.6)' }}>Goal</span>
            <span style={{ fontSize: `${11 * zoom}px`, color: '#10b981', fontWeight: 700 }}>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: `${8 * zoom}px`, background: 'rgba(255,255,255,0.1)', borderRadius: 99 }}>
            <div style={{ width: `${progress}%`, height: '100%', background: '#10b981', borderRadius: 99 }} />
          </div>
        </div>
      );
    }

    case 'social-links':
      return (
        <div style={{ ...baseStyle, gap: `${8 * zoom}px`, flexDirection: 'row' }}>
          {['Twitch', 'Twitter', 'Discord', 'YouTube'].map(n => (
            <div key={n} style={{ padding: `${4 * zoom}px ${8 * zoom}px`, borderRadius: `${4 * zoom}px`, background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', fontSize: `${10 * zoom}px`, color: '#c4b5fd', fontWeight: 600 }}>
              {n}
            </div>
          ))}
        </div>
      );

    // ── Media ─────────────────────────────────────────────────────────────────
    case 'image':
    case 'gif':
      return (
        <div style={{ ...baseStyle, flexDirection: 'column', gap: `${6 * zoom}px` }}>
          <span style={{ fontSize: `${20 * zoom}px` }}>🖼</span>
          <span style={{ fontSize: `${9 * zoom}px`, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 2 }}>
            {type === 'gif' ? 'GIF' : 'Image'}
          </span>
        </div>
      );

    case 'video':
    case 'game-capture':
      return (
        <div style={{ ...baseStyle, background: '#000' }}>
          <span style={{ fontSize: `${22 * zoom}px`, opacity: 0.3 }}>{type === 'video' ? '📹' : '🎮'}</span>
        </div>
      );

    case 'camera-frame': {
      const label2 = content.settings?.frameLabel;
      return (
        <div style={{ ...baseStyle, background: '#111', position: 'relative' }}>
          <span style={{ fontSize: `${32 * zoom}px`, opacity: 0.2 }}>📷</span>
          {label2 && (
            <div style={{ position: 'absolute', bottom: `${8 * zoom}px`, left: `${8 * zoom}px`, background: 'rgba(0,0,0,0.7)', padding: `${4 * zoom}px ${8 * zoom}px`, borderRadius: `${4 * zoom}px`, fontSize: `${11 * zoom}px`, color: '#fff', fontWeight: 600 }}>
              {label2}
            </div>
          )}
        </div>
      );
    }

    case 'avatar-frame':
      return (
        <div style={{ ...baseStyle, borderRadius: '50%', background: 'rgba(168,85,247,0.1)', border: `${(s.borderSize ?? 3) * zoom}px solid ${s.borderColor ?? '#a855f7'}` }}>
          <span style={{ fontSize: `${32 * zoom}px` }}>🧑</span>
        </div>
      );

    case 'logo':
      return (
        <div style={baseStyle}>
          <span style={{ ...textStyle, fontSize: `${(s.fontSize ?? 28) * zoom}px`, fontWeight: '800' }}>
            {content.settings?.text ?? '⚡ YourLogo'}
          </span>
        </div>
      );

    case 'vtuber':
      return (
        <div style={{ ...baseStyle, background: 'transparent', border: '2px dashed rgba(168,85,247,0.3)' }}>
          <span style={{ fontSize: `${28 * zoom}px`, opacity: 0.5 }}>🎭</span>
        </div>
      );

    case 'lottie':
    case 'svg':
      return (
        <div style={{ ...baseStyle, background: 'transparent', border: '2px dashed rgba(168,85,247,0.3)' }}>
          <span style={{ fontSize: `${22 * zoom}px`, opacity: 0.5 }}>{type === 'lottie' ? '🌀' : '▲'}</span>
        </div>
      );

    // ── Stream ────────────────────────────────────────────────────────────────
    case 'chat-box': {
      const msgs = [
        { user: 'StreamFan99', text: 'Hello! PogChamp', color: '#a855f7' },
        { user: 'CoolViewer', text: 'Great stream! Clap', color: '#5cffe2' },
        { user: 'TwitchPrime', text: 'LUL LUL LUL', color: '#ff4dff' },
        { user: 'ChatMod', text: 'Welcome everyone!', color: '#f59e0b' },
        { user: 'StreamFan', text: 'PauseChamp incoming', color: '#ec4899' },
      ];
      return (
        <div style={{ ...baseStyle, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', gap: `${4 * zoom}px`, padding: `${(s.padding ?? 12) * zoom}px` }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: `${4 * zoom}px`, fontSize: `${11 * zoom}px`, lineHeight: 1.4 }}>
              <span style={{ color: m.color, fontWeight: 700, flexShrink: 0 }}>{m.user}:</span>
              <span style={{ color: 'rgba(255,255,255,0.75)' }}>{m.text}</span>
            </div>
          ))}
        </div>
      );
    }

    case 'event-list':
    case 'donation-feed': {
      const events = [
        { icon: '❤️', text: 'StreamFan99 followed', sub: '2s ago' },
        { icon: '⭐', text: 'CoolViewer subscribed', sub: '1m ago' },
        { icon: '💸', text: '$5.00 from TwitchPrime', sub: '3m ago' },
      ];
      return (
        <div style={{ ...baseStyle, flexDirection: 'column', alignItems: 'flex-start', gap: `${6 * zoom}px`, padding: `${(s.padding ?? 12) * zoom}px` }}>
          {events.map((ev, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: `${6 * zoom}px`, width: '100%' }}>
              <span style={{ fontSize: `${14 * zoom}px` }}>{ev.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: `${11 * zoom}px`, color: '#fff', fontWeight: 600 }}>{ev.text}</div>
                <div style={{ fontSize: `${9 * zoom}px`, color: 'rgba(255,255,255,0.35)' }}>{ev.sub}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    case 'alerts':
      return (
        <div style={{ ...baseStyle, flexDirection: 'column', border: '2px dashed rgba(245,158,11,0.4)', background: 'transparent' }}>
          <span style={{ fontSize: `${18 * zoom}px` }}>🔔</span>
          <span style={{ fontSize: `${9 * zoom}px`, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: 2, marginTop: `${4 * zoom}px` }}>Alert Box</span>
        </div>
      );

    case 'spotify': {
      return (
        <div style={{ ...baseStyle, flexDirection: 'row', gap: `${10 * zoom}px`, padding: `${(s.padding ?? 14) * zoom}px`, alignItems: 'center' }}>
          <div style={{ width: `${44 * zoom}px`, height: `${44 * zoom}px`, borderRadius: `${4 * zoom}px`, background: 'rgba(30,215,96,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: `${20 * zoom}px` }}>🎵</span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: `${12 * zoom}px`, color: '#fff', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Chill Synthwave</div>
            <div style={{ fontSize: `${10 * zoom}px`, color: 'rgba(255,255,255,0.45)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Neon Dreams</div>
          </div>
          <span style={{ fontSize: `${14 * zoom}px`, opacity: 0.5 }}>▶</span>
        </div>
      );
    }

    case 'poll': {
      const options = [
        { label: 'Option A', pct: 45 },
        { label: 'Option B', pct: 35 },
        { label: 'Option C', pct: 20 },
      ];
      return (
        <div style={{ ...baseStyle, flexDirection: 'column', alignItems: 'flex-start', gap: `${6 * zoom}px`, padding: `${(s.padding ?? 12) * zoom}px` }}>
          <div style={{ fontSize: `${11 * zoom}px`, color: '#a855f7', fontWeight: 700, marginBottom: `${2 * zoom}px`, textTransform: 'uppercase', letterSpacing: 1 }}>Poll</div>
          {options.map((opt, i) => (
            <div key={i} style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: `${2 * zoom}px` }}>
                <span style={{ fontSize: `${10 * zoom}px`, color: '#fff' }}>{opt.label}</span>
                <span style={{ fontSize: `${10 * zoom}px`, color: 'rgba(255,255,255,0.4)' }}>{opt.pct}%</span>
              </div>
              <div style={{ width: '100%', height: `${6 * zoom}px`, background: 'rgba(168,85,247,0.15)', borderRadius: 99 }}>
                <div style={{ width: `${opt.pct}%`, height: '100%', background: 'rgba(168,85,247,0.6)', borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    // ── Shapes / Deco ─────────────────────────────────────────────────────────
    case 'shape':
    case 'corner-decoration':
    case 'glow-effect':
    case 'particles':
      return <div style={baseStyle} />;

    case 'badge': {
      const badgeText = content.settings?.badgeText ?? widget.label;
      return (
        <div style={{ ...baseStyle }}>
          <span style={{ ...textStyle, fontSize: `${(s.fontSize ?? 13) * zoom}px`, textAlign: 'center' }}>
            {badgeText}
          </span>
        </div>
      );
    }

    default:
      return (
        <div style={{ ...baseStyle, border: '1px dashed rgba(168,85,247,0.4)', flexDirection: 'column' }}>
          <span style={{ fontSize: `${16 * zoom}px`, opacity: 0.4 }}>□</span>
          <span style={{ fontSize: `${9 * zoom}px`, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 1, marginTop: `${3 * zoom}px` }}>{type}</span>
        </div>
      );
  }
};

// ── Helper ────────────────────────────────────────────────────────────────────

function buildBoxShadow(s: SceneWidget['style']) {
  const parts: string[] = [];
  if (s.shadowBlur && s.shadowBlur > 0) {
    parts.push(`${s.shadowX ?? 0}px ${s.shadowY ?? 4}px ${s.shadowBlur}px ${s.shadowColor ?? 'rgba(0,0,0,0.5)'}`);
  }
  if (s.glowColor && s.glowBlur) {
    parts.push(`0 0 ${s.glowBlur}px ${s.glowColor}`);
    parts.push(`0 0 ${s.glowBlur * 2}px ${s.glowColor}40`);
  }
  return parts.length ? parts.join(', ') : undefined;
}

function buildTextShadow(s: SceneWidget['style']) {
  const parts: string[] = [];
  if (s.textShadowBlur && s.textShadowBlur > 0) {
    parts.push(`${s.textShadowX ?? 0}px ${s.textShadowY ?? 2}px ${s.textShadowBlur}px ${s.textShadowColor ?? 'rgba(0,0,0,0.5)'}`);
  }
  if (s.glowColor && s.glowBlur) {
    parts.push(`0 0 ${s.glowBlur}px ${s.glowColor}`);
  }
  return parts.length ? parts.join(', ') : undefined;
}
