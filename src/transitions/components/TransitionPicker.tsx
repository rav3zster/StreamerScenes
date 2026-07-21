/**
 * TransitionPicker.tsx
 * Reusable popover component for selecting a transition from the library.
 * Used in LiveControlPanel and RightPanel scene inspector.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Zap, X, ChevronDown } from 'lucide-react';
import { useTransitionStore } from '../../store/transitionStore';
import { TRANSITION_LIBRARY } from '../transitionLibrary';
import type { TransitionScene } from '../types';

interface TransitionPickerProps {
  /** Currently selected transition ID, or null for "Use Default" / "None" */
  value: string | null;
  /** Called when user picks a transition or clears selection */
  onChange: (id: string | null) => void;
  /** Label shown when value is null */
  noneLabel?: string;
  /** Small variant for compact UI */
  compact?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const TransitionPicker: React.FC<TransitionPickerProps> = ({
  value,
  onChange,
  noneLabel = 'Use Default',
  compact = false,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const userTransitions = useTransitionStore(s => s.transitions);
  const allTransitions = React.useMemo(() => [...TRANSITION_LIBRARY, ...userTransitions], [userTransitions]);

  const selected = value ? allTransitions.find(t => t.id === value) : null;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const ACCENT = '#a855f7';

  const btnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'var(--color-surface-2)',
    border: `1px solid ${open ? ACCENT + '80' : 'var(--color-border)'}`,
    borderRadius: 6,
    color: 'var(--color-text)',
    fontSize: compact ? 9 : 10,
    fontWeight: 600,
    padding: compact ? '3px 7px' : '5px 9px',
    cursor: 'pointer',
    width: '100%',
    justifyContent: 'space-between',
    transition: 'border-color 120ms ease',
  };

  // Group transitions by template / custom
  const templates = allTransitions.filter(t => t.isTemplate);
  const custom = allTransitions.filter(t => !t.isTemplate);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button style={btnStyle} onClick={() => setOpen(o => !o)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Zap size={10} color={ACCENT} />
          {selected ? selected.name : noneLabel}
        </span>
        <ChevronDown size={10} color="rgba(255,255,255,0.4)" />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          maxHeight: 300,
          overflowY: 'auto',
          padding: '4px 0',
        }}>
          {/* None option */}
          <PickerRow
            label={noneLabel}
            selected={value === null}
            onClick={() => { onChange(null); setOpen(false); }}
            isNone
          />

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />

          {/* Custom transitions */}
          {custom.length > 0 && (
            <>
              <SectionLabel>My Transitions</SectionLabel>
              {custom.map(t => (
                <PickerRow
                  key={t.id}
                  label={t.name}
                  duration={t.duration}
                  category={t.category}
                  selected={value === t.id}
                  onClick={() => { onChange(t.id); setOpen(false); }}
                />
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
            </>
          )}

          {/* Built-in templates */}
          <SectionLabel>Built-in Templates</SectionLabel>
          {templates.map(t => (
            <PickerRow
              key={t.id}
              label={t.name}
              duration={t.duration}
              category={t.category}
              selected={value === t.id}
              onClick={() => { onChange(t.id); setOpen(false); }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 8, fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: 0.5, padding: '4px 10px 2px', textTransform: 'uppercase' }}>
    {children}
  </div>
);

interface PickerRowProps {
  label: string;
  duration?: number;
  category?: string;
  selected: boolean;
  onClick: () => void;
  isNone?: boolean;
}

const PickerRow: React.FC<PickerRowProps> = ({ label, duration, category, selected, onClick, isNone }) => {
  const [hover, setHover] = useState(false);
  const ACCENT = '#a855f7';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '6px 10px',
        background: selected ? `${ACCENT}18` : hover ? 'rgba(255,255,255,0.04)' : 'transparent',
        border: 'none',
        borderLeft: selected ? `2px solid ${ACCENT}` : '2px solid transparent',
        color: selected ? ACCENT : 'var(--color-text)',
        fontSize: 10,
        fontWeight: selected ? 700 : 500,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 80ms ease',
        fontFamily: 'inherit',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {isNone ? <X size={9} /> : <Zap size={9} />}
        {label}
      </span>
      {duration !== undefined && (
        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>
          {duration}ms
        </span>
      )}
    </button>
  );
};
