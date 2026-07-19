import React, { useEffect, useState } from 'react';
import { Sparkles, Check, Zap, Layers, Image } from 'lucide-react';
import { useWizardStore } from '../../store/wizardStore';
import { useEditorStore } from '../../store/editorStore';
import { STREAM_PACKS } from '../../data/streamPacks';
import { applyStreamerProfile } from '../../personalization/placeholderReplacer';

export const StepFinish: React.FC = () => {
  const { selectedPackId, streamerProfile, wizardTheme } = useWizardStore();
  const { createProjectFromPack } = useEditorStore();
  const [phase, setPhase] = useState<'building' | 'done'>('building');

  const pack = STREAM_PACKS.find(p => p.id === selectedPackId);

  useEffect(() => {
    if (!pack) return;

    // Step 1: Create project from pack
    const timer1 = setTimeout(() => {
      // Create a modified version of createProjectFromPack that applies personalization
      createProjectFromPack(streamerProfile.streamerName.trim() || pack.name, pack.id);

      // Apply streamer profile replacements to the created scenes
      const state = useEditorStore.getState();
      const personalizedScenes = applyStreamerProfile(state.scenes, streamerProfile);
      state.setScenes(personalizedScenes);
      state.setLiveScenes(JSON.parse(JSON.stringify(personalizedScenes)));

      // Apply wizard theme overrides via CSS variables
      setTimeout(() => {
        const shell = document.querySelector('.app-shell');
        if (shell) {
          if (wizardTheme.accentColor) (shell as HTMLElement).style.setProperty('--color-accent', wizardTheme.accentColor);
          if (wizardTheme.backgroundColor) (shell as HTMLElement).style.setProperty('--color-bg', wizardTheme.backgroundColor);
          if (wizardTheme.textColor) (shell as HTMLElement).style.setProperty('--color-text', wizardTheme.textColor);
          if (wizardTheme.borderRadius !== null) {
            (shell as HTMLElement).style.setProperty('--radius-md', `${wizardTheme.borderRadius}px`);
            (shell as HTMLElement).style.setProperty('--radius-lg', `${Math.min(wizardTheme.borderRadius + 4, 48)}px`);
          }
        }
        setPhase('done');
      }, 400);
    }, 800);

    return () => clearTimeout(timer1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pack, pack?.id, pack?.name]);

  const stats = pack ? {
    Scenes: pack.scenes.length,
    Widgets: pack.scenes.reduce((t, s) => t + s.widgets.length, 0),
    Name: streamerProfile.streamerName || pack.name,
  } : null;

  if (phase === 'done') {
    return (
      <BuildPhase
        icon={<Check size={28} />}
        title="Your Stream is Ready!"
        subtitle="Opening the editor..."
        accent={pack?.accentColor || '#a855f7'}
        details={stats}
      />
    );
  }

  return (
    <BuildPhase
      icon={<Sparkles size={28} />}
      title="Building Your Stream"
      subtitle="Setting up scenes, widgets, and personalization..."
      accent={pack?.accentColor || '#a855f7'}
      details={stats}
      isBuilding
    />
  );
};

// ─── Build Phase ──────────────────────────────────────────────────────────────

const BuildPhase: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accent: string;
  details: { Scenes: number; Widgets: number; Name: string } | null;
  isBuilding?: boolean;
}> = ({ icon, title, subtitle, accent, details, isBuilding }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    flex: 1, padding: '0 24px', gap: 24,
  }}>
    {/* Animated icon */}
    <div style={{
      width: 72, height: 72, borderRadius: 20,
      background: isBuilding
        ? `linear-gradient(135deg, ${accent}, ${accent}88)`
        : `linear-gradient(135deg, #10b981, #059669)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: isBuilding
        ? `0 0 40px ${accent}40`
        : '0 0 40px rgba(16,185,129,0.3)',
      animation: isBuilding ? 'spin 2s linear infinite' : 'zoom-in 300ms ease',
    }}>
      {icon}
    </div>

    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: 0, marginBottom: 8 }}>
        {title}
      </h2>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
        {subtitle}
      </p>
    </div>

    {/* Summary card */}
    {details && (
      <div style={{
        background: 'rgba(12,10,22,0.6)', border: `1px solid ${accent}20`,
        borderRadius: 14, padding: '16px 20px',
        display: 'flex', gap: 24,
      }}>
        <SummaryItem icon={<Zap size={14} />} label="Pack" value={details.Name} />
        <SummaryItem icon={<Layers size={14} />} label="Scenes" value={`${details.Scenes}`} />
        <SummaryItem icon={<Image size={14} />} label="Widgets" value={`${details.Widgets}`} />
      </div>
    )}

    {isBuilding && (
      <div style={{ width: 200, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 99,
          background: `linear-gradient(90deg, ${accent}, #5cffe2)`,
          animation: 'progress-anim 1.5s ease-in-out infinite',
          width: '40%',
        }} />
      </div>
    )}

    <style>{`
      @keyframes progress-anim {
        0% { transform: translateX(-100%); width: 40%; }
        50% { width: 80%; }
        100% { transform: translateX(400%); width: 40%; }
      }
    `}</style>
  </div>
);

const SummaryItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
    <span style={{ color: 'rgba(255,255,255,0.3)' }}>{icon}</span>
    <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{value}</span>
  </div>
);
