import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Radio } from 'lucide-react';
import { useEditorStore, getTimerRemaining } from '../../store/editorStore';

const timeBtnStyle: React.CSSProperties = {
  flex: '1 0 28%',
  background: 'var(--color-surface-2)',
  border: '1px solid var(--color-border)',
  borderRadius: '4px',
  color: 'var(--color-text-2)',
  padding: '4px 6px',
  fontSize: '10px',
  fontWeight: 600,
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'all 80ms ease',
};

const TimeAdjustButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...timeBtnStyle,
        borderColor: hover ? 'var(--color-border-hover)' : 'var(--color-border)',
        color: hover ? 'var(--color-text)' : 'var(--color-text-2)',
      }}
    >
      {label}
    </button>
  );
};

export const LiveControlPanel: React.FC = () => {
  const {
    liveTimer,
    startLiveTimer,
    pauseLiveTimer,
    resumeLiveTimer,
    adjustLiveTimer,
    resetLiveTimer,
    switchDraftToLive,
    liveScenes,
    liveSceneId,
    liveTransitionType,
    liveTransitionDuration,
    setLiveTransitionType,
    setLiveTransitionDuration
  } = useEditorStore();

  const [remaining, setRemaining] = useState(() => getTimerRemaining(liveTimer));

  // Sync remaining with timer runtime state changes
  useEffect(() => {
    setRemaining(getTimerRemaining(liveTimer));
  }, [liveTimer]);

  // Derived countdown polling loop for the readout
  useEffect(() => {
    if (!liveTimer.isRunning || liveTimer.isFinished) {
      return;
    }

    const interval = setInterval(() => {
      const cur = getTimerRemaining(liveTimer);
      setRemaining(cur);
    }, 100);

    return () => clearInterval(interval);
  }, [liveTimer]);

  const minutes = Math.floor(remaining / 60);
  const seconds = Math.round(remaining % 60);
  const adjustedSec = seconds === 60 ? 0 : seconds;
  const adjustedMin = seconds === 60 ? minutes + 1 : minutes;
  const display = `${String(adjustedMin).padStart(2, '0')}:${String(adjustedSec).padStart(2, '0')}`;

  // Get status string
  let status = 'STANDBY';
  let statusColor = 'var(--color-text-muted)';
  if (liveTimer.isRunning) {
    status = 'RUNNING';
    statusColor = '#10b981';
  } else if (liveTimer.isFinished) {
    status = 'FINISHED';
    statusColor = '#ef4444';
  } else if (liveTimer.startedAt !== null) {
    status = 'PAUSED';
    statusColor = '#3b82f6';
  }

  const liveSceneLabel = liveScenes.find(s => s.id === liveSceneId)?.label || 'No Live Scene';

  const handleStartPause = () => {
    if (liveTimer.isRunning) {
      pauseLiveTimer();
    } else if (liveTimer.startedAt !== null) {
      resumeLiveTimer();
    } else {
      // Find duration in active scene to start with
      const activeLiveId = liveSceneId || (liveScenes[0]?.id ?? null);
      const liveScene = liveScenes.find(s => s.id === activeLiveId);
      const widget = liveScene?.widgets.find(w => w.type === 'countdown-timer');
      const startDur = widget?.content.settings?.duration ?? liveTimer.duration ?? 600;
      const startBehavior = widget?.content.settings?.finishBehavior ?? 'freeze';
      
      startLiveTimer(startDur, startBehavior, {
        replaceText: widget?.content.settings?.replaceText ?? '',
        replaceTransition: widget?.content.settings?.replaceTransition ?? 'none',
        switchTargetSceneId: widget?.content.settings?.switchTargetSceneId ?? null,
      });
    }
  };

  const handleReset = () => {
    const activeLiveId = liveSceneId || (liveScenes[0]?.id ?? null);
    const liveScene = liveScenes.find(s => s.id === activeLiveId);
    const widget = liveScene?.widgets.find(w => w.type === 'countdown-timer');
    const startDur = widget?.content.settings?.duration ?? 600;
    resetLiveTimer(startDur);
  };

  return (
    <div style={{
      padding: '12px',
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: '10px',
      fontFamily: 'var(--font-sans)',
      color: 'var(--color-text)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      {/* Header info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-text-3)', letterSpacing: '0.05em' }}>
          LIVE BROADCAST STATE
        </span>
        <span style={{
          fontSize: '9px',
          fontWeight: 800,
          background: 'rgba(255,255,255,0.06)',
          padding: '2px 6px',
          borderRadius: '4px',
          color: 'var(--color-text-2)'
        }}>
          {liveSceneLabel}
        </span>
      </div>

      {/* Clock display */}
      <div style={{
        background: 'var(--color-surface-2)',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.02)',
      }}>
        <span style={{
          fontSize: '36px',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700,
          color: liveTimer.isRunning ? 'var(--color-accent-2)' : 'var(--color-text)',
          textShadow: liveTimer.isRunning ? '0 0 10px rgba(92,255,226,0.3)' : 'none',
          lineHeight: 1,
        }}>
          {display}
        </span>
        <span style={{
          fontSize: '9px',
          fontWeight: 800,
          marginTop: '6px',
          color: statusColor,
          letterSpacing: '0.1em',
        }}>
          ● {status}
        </span>
      </div>

      {/* Primary Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleStartPause}
          style={{
            flex: 2,
            background: 'var(--color-surface-3)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            color: 'var(--color-text)',
            padding: '8px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 80ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        >
          {liveTimer.isRunning ? <Pause size={12} /> : <Play size={12} />}
          {liveTimer.isRunning ? 'Pause Timer' : liveTimer.startedAt !== null ? 'Resume' : 'Start Timer'}
        </button>

        <button
          onClick={handleReset}
          title="Reset"
          style={{
            flex: 1,
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            color: 'var(--color-text-2)',
            padding: '8px',
            fontSize: '11px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            transition: 'all 80ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.color = 'var(--color-text)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-2)'; }}
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* Adjustments */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Adjust Time:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          <TimeAdjustButton label="+30s" onClick={() => adjustLiveTimer(30)} />
          <TimeAdjustButton label="+1m" onClick={() => adjustLiveTimer(60)} />
          <TimeAdjustButton label="+5m" onClick={() => adjustLiveTimer(300)} />
          <TimeAdjustButton label="+10m" onClick={() => adjustLiveTimer(600)} />
          <TimeAdjustButton label="-30s" onClick={() => adjustLiveTimer(-30)} />
          <TimeAdjustButton label="-1m" onClick={() => adjustLiveTimer(-60)} />
        </div>
      </div>

      {/* Transitions Config */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-muted)' }}>Transition:</div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <select
            value={liveTransitionType}
            onChange={e => setLiveTransitionType(e.target.value as any)}
            style={{
              flex: 1,
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              color: 'var(--color-text)',
              fontSize: '10px',
              padding: '4px 6px',
              outline: 'none',
            }}
          >
            <option value="none">None</option>
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
          </select>
          
          <input
            type="number"
            value={liveTransitionDuration}
            onChange={e => setLiveTransitionDuration(Math.max(0, parseInt(e.target.value) || 0))}
            style={{
              width: '60px',
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              color: 'var(--color-text)',
              fontSize: '10px',
              padding: '4px 6px',
              textAlign: 'center',
              outline: 'none',
            }}
            placeholder="ms"
            title="Transition duration (ms)"
          />
          <span style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>ms</span>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--color-border)', margin: '4px 0' }} />

      {/* Push to OBS Live */}
      <button
        onClick={switchDraftToLive}
        style={{
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          boxShadow: '0 4px 12px rgba(239,68,68,0.25)',
          transition: 'all 120ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
      >
        <Radio size={12} />
        Switch To Live
      </button>
    </div>
  );
};
