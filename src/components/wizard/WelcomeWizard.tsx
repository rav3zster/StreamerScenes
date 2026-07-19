import React from 'react';
import { type WizardStepState, useWizardStore } from '../../store/wizardStore';
import { WizardProgress } from './WizardProgress';
import { StepWelcome } from './StepWelcome';
import { StepPackSelection } from './StepPackSelection';
import { StepPersonalize } from './StepPersonalize';
import { StepThemeReview } from './StepThemeReview';
import { StepFinish } from './StepFinish';
import { ChevronLeft, X } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { STREAM_PACKS } from '../../data/streamPacks';
import { applyStreamerProfile } from '../../personalization/placeholderReplacer';
import { persistenceService } from '../../persistence/persistenceService';

const STEPS: { label: string; state: WizardStepState }[] = [
  { label: 'Welcome', state: 'WELCOME' },
  { label: 'Choose Style', state: 'PACK_SELECTION' },
  { label: 'Personalize', state: 'PERSONALIZATION' },
  { label: 'Review Theme', state: 'THEME_REVIEW' },
  { label: 'Finish', state: 'COMPLETE' },
];

export const WelcomeWizard: React.FC = () => {
  const { wizardState, setWizardState, resetWizard, selectedPackId, streamerProfile, wizardTheme } = useWizardStore();
  const { setAppView, createProjectFromPack } = useEditorStore();

  const handleBack = () => {
    if (wizardState === 'PACK_SELECTION') setWizardState('WELCOME');
    else if (wizardState === 'PERSONALIZATION') setWizardState('PACK_SELECTION');
    else if (wizardState === 'THEME_REVIEW') setWizardState('PERSONALIZATION');
  };

  const buildProject = () => {
    setWizardState('BUILDING_PROJECT');

    // Perform project creation immediately in a single execution block
    // We wrap in a visual-only loading delay of 1.2 seconds for layout animation before success screen
    setTimeout(() => {
      const pack = STREAM_PACKS.find(p => p.id === selectedPackId);
      if (pack) {
        // 1. Create project structure from pack
        createProjectFromPack(streamerProfile.streamerName.trim() || pack.name, pack.id);

        // 2. Map streamer personalization to instantiated widgets
        const state = useEditorStore.getState();
        const personalizedScenes = applyStreamerProfile(state.scenes, streamerProfile);
        state.setScenes(personalizedScenes);
        state.setLiveScenes(JSON.parse(JSON.stringify(personalizedScenes)));

        // 3. Store theme overrides in global editor state (AppShell will render CSS vars)
        state.setThemeOverrides({
          accentColor: wizardTheme.accentColor,
          backgroundColor: wizardTheme.backgroundColor,
          textColor: wizardTheme.textColor,
          borderRadius: wizardTheme.borderRadius,
          glassIntensity: wizardTheme.glassIntensity,
          animationsEnabled: wizardTheme.animationsEnabled,
          transitionStyle: wizardTheme.transitionStyle,
        });

        // 4. Save project to database
        const editorState = useEditorStore.getState();
        persistenceService.saveProject({
          projectName: editorState.projectName,
          scenes: editorState.scenes,
          liveScenes: editorState.liveScenes,
          liveSceneId: editorState.liveSceneId,
          editingSceneId: editorState.editingSceneId,
          liveTimer: editorState.liveTimer,
          liveTransitionType: editorState.liveTransitionType,
          liveTransitionDuration: editorState.liveTransitionDuration,
          selectedPackId: editorState.selectedPackId,
          updatedAt: Date.now(),
        }).catch(err => console.error('Failed to auto-save project from wizard:', err));
      }

      // Transition wizard state to COMPLETE to render success details
      setWizardState('COMPLETE');
    }, 1200);
  };

  const handleNext = () => {
    if (wizardState === 'WELCOME') setWizardState('PACK_SELECTION');
    else if (wizardState === 'PACK_SELECTION') setWizardState('PERSONALIZATION');
    else if (wizardState === 'PERSONALIZATION') setWizardState('THEME_REVIEW');
    else if (wizardState === 'THEME_REVIEW') {
      buildProject();
    }
  };

  const handleCancel = () => {
    resetWizard();
    setAppView('editor');
  };

  const canGoBack = wizardState !== 'WELCOME' && wizardState !== 'BUILDING_PROJECT' && wizardState !== 'COMPLETE';
  const canGoNext = wizardState === 'PACK_SELECTION' ? !!selectedPackId : (wizardState !== 'BUILDING_PROJECT' && wizardState !== 'COMPLETE');
  const showNav = wizardState !== 'WELCOME' && wizardState !== 'BUILDING_PROJECT' && wizardState !== 'COMPLETE';

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#05030a',
        backgroundImage: [
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
          'radial-gradient(ellipse 50% 40% at 20% 80%, rgba(92, 255, 226, 0.05) 0%, transparent 50%)',
          'radial-gradient(ellipse 40% 30% at 80% 90%, rgba(236, 72, 153, 0.04) 0%, transparent 50%)',
        ].join(', '),
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Outfit, Inter, sans-serif',
      }}
    >
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%)',
      }} />

      {/* Top bar */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, boxShadow: '0 0 14px rgba(168,85,247,0.4)' }}>⚡</div>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>VibeOverlay <span style={{ color: '#a855f7' }}>Studio</span></span>
        </div>

        {wizardState !== 'WELCOME' && (
          <button
            onClick={handleCancel}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8, padding: '6px 12px',
              color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
          >
            <X size={12} /> Cancel
          </button>
        )}
      </div>

      {/* Progress indicator */}
      {wizardState !== 'WELCOME' && (
        <WizardProgress steps={STEPS} wizardState={wizardState} />
      )}

      {/* Step content */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 1 }}>
        <StepRenderer wizardState={wizardState} />

        {/* Bottom navigation */}
        {showNav && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 28px', borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,0,0,0.2)', flexShrink: 0,
          }}>
            <button
              onClick={handleBack}
              disabled={!canGoBack}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '8px 16px', borderRadius: 8,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                color: canGoBack ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)',
                fontSize: 11, fontWeight: 600, cursor: canGoBack ? 'pointer' : 'default',
                fontFamily: 'inherit', transition: 'all 150ms ease',
                opacity: canGoBack ? 1 : 0.3,
              }}
              onMouseEnter={e => { if (canGoBack) { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = canGoBack ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)'; }}
            >
              <ChevronLeft size={13} /> Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '8px 18px', borderRadius: 8, border: 'none',
                background: canGoNext
                  ? 'linear-gradient(135deg, #a855f7, #ec4899)'
                  : 'rgba(255,255,255,0.08)',
                color: canGoNext ? '#fff' : 'rgba(255,255,255,0.3)',
                fontSize: 11, fontWeight: 700, cursor: canGoNext ? 'pointer' : 'default',
                fontFamily: 'inherit', transition: 'all 150ms ease',
                opacity: canGoNext ? 1 : 0.5,
              }}
              onMouseEnter={e => { if (canGoNext) e.currentTarget.style.filter = 'brightness(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
            >
              Continue <ChevronLeft size={13} style={{ transform: 'rotate(180deg)' }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Step Router ──────────────────────────────────────────────────────────────

const StepRenderer: React.FC<{ wizardState: WizardStepState }> = ({ wizardState }) => {
  switch (wizardState) {
    case 'WELCOME':
      return <StepWelcome />;
    case 'PACK_SELECTION':
      return <StepPackSelection />;
    case 'PERSONALIZATION':
      return <StepPersonalize />;
    case 'THEME_REVIEW':
      return <StepThemeReview />;
    case 'BUILDING_PROJECT':
    case 'COMPLETE':
      return <StepFinish />;
    default:
      return <StepWelcome />;
  }
};
