/**
 * TransitionCard.tsx
 * Card component displayed in the Transition Library panel.
 */

import React, { useState } from 'react';
import { Zap, Copy, Trash2, Edit2, Star } from 'lucide-react';
import type { TransitionScene } from '../types';

interface TransitionCardProps {
  transition: TransitionScene;
  selected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onDelete?: () => void;
  onEdit: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Energetic: '#ef4444',
  Minimal: '#64748b',
  Cinematic: '#3b82f6',
  Anime: '#ec4899',
  Esports: '#a855f7',
  VTuber: '#f472b6',
  Logo: '#f59e0b',
  Glitch: '#22d3ee',
  Custom: '#10b981',
};

export const TransitionCard: React.FC<TransitionCardProps> = ({
  transition,
  selected,
  onSelect,
  onDuplicate,
  onDelete,
  onEdit,
}) => {
  const [hover, setHover] = useState(false);
  const accent = 'var(--color-accent)';
  const categoryColor = CATEGORY_COLORS[transition.category] ?? accent;

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: selected ? 'var(--color-accent-subtle)' : hover ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
        border: `1px solid ${selected ? 'var(--color-accent-alpha-40)' : hover ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
        borderRadius: 10,
        padding: '10px 12px',
        cursor: 'pointer',
        transition: 'all 120ms ease',
        position: 'relative',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
            <Zap size={10} color={accent} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {transition.name}
            </span>
            {transition.isTemplate && (
              <span title="Built-in template" style={{ display: 'inline-flex' }}>
                <Star size={8} color="#f59e0b" fill="#f59e0b" />
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{
              fontSize: 8, fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase',
              color: categoryColor, background: `${categoryColor}20`,
              padding: '1px 5px', borderRadius: 3,
            }}>
              {transition.category}
            </span>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)' }}>
              {transition.duration}ms
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {transition.description && (
        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {transition.description}
        </p>
      )}

      {/* Action row — shown on hover */}
      <div style={{
        display: 'flex', gap: 4, marginTop: 8,
        opacity: hover || selected ? 1 : 0,
        transition: 'opacity 120ms ease',
      }}>
        <ActionBtn icon={<Edit2 size={9} />} label="Edit" onClick={(e) => { e.stopPropagation(); onEdit(); }} accent={accent} />
        <ActionBtn icon={<Copy size={9} />} label="Duplicate" onClick={(e) => { e.stopPropagation(); onDuplicate(); }} accent={accent} />
        {onDelete && (
          <ActionBtn icon={<Trash2 size={9} />} label="Delete" onClick={(e) => { e.stopPropagation(); onDelete(); }} danger />
        )}
      </div>

      {/* Widget count badge */}
      <div style={{
        position: 'absolute', top: 8, right: 8,
        fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
        background: 'rgba(255,255,255,0.05)', borderRadius: 4, padding: '2px 5px',
      }}>
        {transition.widgets.length}w
      </div>
    </div>
  );
};

const ActionBtn: React.FC<{ icon: React.ReactNode; label: string; onClick: (e: React.MouseEvent) => void; accent?: string; danger?: boolean }> = ({
  icon, label, onClick, accent, danger,
}) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={label}
      style={{
        display: 'flex', alignItems: 'center', gap: 3,
        padding: '3px 7px', borderRadius: 5, fontSize: 9, fontWeight: 600,
        border: '1px solid rgba(255,255,255,0.08)',
        background: hover ? (danger ? 'rgba(239,68,68,0.15)' : `${accent}15`) : 'rgba(255,255,255,0.03)',
        color: hover ? (danger ? '#ef4444' : accent) : 'rgba(255,255,255,0.5)',
        cursor: 'pointer', fontFamily: 'inherit', transition: 'all 80ms ease',
      }}
    >
      {icon}
      {label}
    </button>
  );
};
