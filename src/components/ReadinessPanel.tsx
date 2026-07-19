import React from 'react';
import { Check, Circle, Radio, AlertCircle } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export interface ReadinessItem {
  key: string;
  label: string;
  check: () => boolean;
  actionLabel?: string;
  action?: () => void;
}

export const useReadinessItems = (): ReadinessItem[] => {
  const store = useEditorStore.getState;

  return [
    {
      key: 'pack-selected',
      label: 'Pack Selected',
      check: () => store().selectedPackId !== null,
    },
    {
      key: 'logo-added',
      label: 'Logo Added',
      check: () => store().scenes.some(s => s.widgets.some(w => w.type === 'logo' && (w.content.settings as any)?.src)),
    },
    {
      key: 'username-added',
      label: 'Username Added',
      check: () => store().scenes.some(s => s.widgets.some(w => {
        const settings = w.content.settings as any;
        return (settings?.text && !settings.text.includes('STREAMER')) || (settings?.username);
      })),
    },
    {
      key: 'social-links-added',
      label: 'Social Links Added',
      check: () => store().scenes.some(s => s.widgets.some(w => {
        if (w.type !== 'social-links') return false;
        const links = (w.content.settings as any)?.links as any[];
        return links && links.some((l: any) => l?.handle);
      })),
    },
    {
      key: 'countdown-configured',
      label: 'Countdown Configured',
      check: () => store().scenes.some(s => s.widgets.some(w =>
        w.type === 'countdown-timer' && ((w.content.settings as any)?.duration ?? 0) > 0
      )),
    },
    {
      key: 'output-running',
      label: 'Project Created',
      check: () => store().scenes.length > 0,
    },
    {
      key: 'obs-connected',
      label: 'OBS Connected',
      check: () => store().readinessManualChecks.obsConnected,
      actionLabel: 'Mark as Connected',
      action: () => store().setReadinessCheck('obsConnected', true),
    },
    {
      key: 'browser-source-verified',
      label: 'Browser Source Verified',
      check: () => store().readinessManualChecks.browserSourceVerified,
      actionLabel: 'Mark as Verified',
      action: () => store().setReadinessCheck('browserSourceVerified', true),
    },
    {
      key: 'theme-applied',
      label: 'Theme Applied',
      check: () => store().selectedPackId !== null,
    },
  ];
};

export const ReadinessPanel: React.FC = () => {
  const items = useReadinessItems();
  const completed = items.filter(i => i.check()).length;
  const total = items.length;
  const isReady = completed === total;

  // Subscribe to store changes
  useEditorStore();

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 12,
      overflow: 'hidden',
      width: 280,
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 12px',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {isReady ? (
            <Radio size={13} color="#ef4444" style={{ animation: 'live-pulse 2s ease-in-out infinite' }} />
          ) : (
            <AlertCircle size={13} color="var(--color-warning)" />
          )}
          <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-text)', letterSpacing: 0.5 }}>
            {isReady ? 'Ready to Go Live' : 'Stream Readiness'}
          </span>
        </div>
        <span style={{
          fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-mono)',
          color: isReady ? 'var(--color-success)' : 'var(--color-text-muted)',
        }}>
          {completed}/{total}
        </span>
      </div>

      {/* Checklist */}
      <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(item => {
          const done = item.check();
          return (
            <div
              key={item.key}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '5px 6px', borderRadius: 6,
                cursor: item.action ? 'pointer' : 'default',
                transition: 'all 150ms ease',
                opacity: done ? 0.7 : 1,
              }}
              onClick={() => {
                if (item.action) item.action();
              }}
              onMouseEnter={e => { if (item.action) e.currentTarget.style.background = 'rgba(168,85,247,0.06)'; }}
              onMouseLeave={e => { if (item.action) e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                background: done ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.04)',
                border: done ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--color-border)',
              }}>
                {done ? <Check size={9} color="#10b981" /> : <Circle size={9} color="var(--color-text-muted)" />}
              </div>
              <span style={{
                flex: 1, fontSize: 10, fontWeight: 600,
                color: done ? 'var(--color-text-3)' : 'var(--color-text-2)',
                textDecoration: done ? 'line-through' : 'none',
              }}>
                {item.label}
              </span>
              {!done && item.actionLabel && (
                <span style={{
                  fontSize: 8, fontWeight: 600, color: 'var(--color-accent)',
                  padding: '1px 5px', borderRadius: 3,
                  background: 'rgba(168,85,247,0.1)',
                }}>
                  {item.actionLabel}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Ready Banner */}
      {isReady && (
        <div style={{
          padding: '10px 12px',
          borderTop: '1px solid rgba(239,68,68,0.15)',
          background: 'rgba(239,68,68,0.04)',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 99,
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', animation: 'live-pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: '#ef4444', letterSpacing: 0.5 }}>
              Ready to Go Live
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
