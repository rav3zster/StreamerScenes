import React from 'react';
import { Check } from 'lucide-react';
import { type WizardStepState } from '../../store/wizardStore';

export interface WizardStepDef {
  label: string;
  state: WizardStepState;
}

interface Props {
  steps: WizardStepDef[];
  wizardState: WizardStepState;
  onStepClick?: (state: WizardStepState) => void;
}

const STATE_INDEX: Record<WizardStepState, number> = {
  WELCOME: 0,
  PACK_SELECTION: 1,
  PERSONALIZATION: 2,
  THEME_REVIEW: 3,
  BUILDING_PROJECT: 4,
  COMPLETE: 4,
};

export const WizardProgress: React.FC<Props> = ({ steps, wizardState, onStepClick }) => {
  const currentIdx = STATE_INDEX[wizardState] ?? 0;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 0, padding: '0 28px', marginBottom: 24, flexShrink: 0,
    }}>
      {steps.map((step, idx) => {
        const stepIdx = STATE_INDEX[step.state] ?? 0;
        const isCompleted = stepIdx < currentIdx;
        const isActive = stepIdx === currentIdx;
        const isClickable = stepIdx <= currentIdx && onStepClick;

        return (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <div style={{
                width: 40, height: 1,
                background: isCompleted
                  ? 'var(--color-accent)'
                  : 'rgba(255,255,255,0.08)',
                transition: 'background 300ms ease',
              }} />
            )}
            <button
              onClick={() => isClickable && onStepClick(step.state)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '6px 12px', borderRadius: 99,
                border: 'none', cursor: isClickable ? 'pointer' : 'default',
                background: isActive
                  ? 'var(--color-accent-alpha-15)'
                  : isCompleted
                  ? 'var(--color-accent-alpha-08)'
                  : 'transparent',
                color: isActive
                  ? 'var(--color-accent)'
                  : isCompleted
                  ? 'var(--color-accent-alpha-55)'
                  : 'rgba(255,255,255,0.25)',
                fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
                transition: 'all 200ms ease',
              }}
            >
              <span style={{
                width: 20, height: 20, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700,
                background: isActive
                  ? 'linear-gradient(135deg, var(--color-accent), var(--color-pink))'
                  : isCompleted
                  ? 'var(--color-accent-alpha-20)'
                  : 'rgba(255,255,255,0.06)',
                color: isActive ? '#fff' : isCompleted ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)',
                flexShrink: 0,
              }}>
                {isCompleted ? <Check size={10} /> : idx + 1}
              </span>
              <span style={{ whiteSpace: 'nowrap' }}>{step.label}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};
