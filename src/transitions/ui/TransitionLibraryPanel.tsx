/**
 * TransitionLibraryPanel.tsx
 * Left panel for the Transition Studio.
 * Shows user transitions, built-in templates, search/filter.
 */

import React, { useState, useMemo } from 'react';
import { Plus, Search, Star, User } from 'lucide-react';
import { useTransitionStore } from '../../store/transitionStore';
import { TRANSITION_LIBRARY } from '../transitionLibrary';
import { TransitionCard } from './TransitionCard';
import type { TransitionCategory } from '../types';

const CATEGORIES: TransitionCategory[] = ['Energetic', 'Minimal', 'Cinematic', 'Anime', 'Esports', 'Logo', 'Glitch'];

export const TransitionLibraryPanel: React.FC = () => {
  const {
    transitions: userTransitions,
    editingTransitionId,
    createTransition,
    duplicateTransition,
    deleteTransition,
    setEditingTransition,
  } = useTransitionStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TransitionCategory | 'All'>('All');
  const [activeTab, setActiveTab] = useState<'mine' | 'templates'>('templates');

  const ACCENT = '#a855f7';

  const filteredTemplates = useMemo(() => {
    return TRANSITION_LIBRARY.filter(t => {
      const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tag => tag.includes(search.toLowerCase()));
      const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  const filteredUser = useMemo(() => {
    return userTransitions.filter(t => {
      const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  }, [userTransitions, search]);

  const handleCreate = () => {
    const id = createTransition('My Transition');
    setEditingTransition(id);
  };

  const handleDuplicate = (id: string) => {
    const newId = duplicateTransition(id);
    setEditingTransition(newId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Transition Library
          </span>
          <button
            onClick={handleCreate}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '4px 8px', borderRadius: 6,
              background: `${ACCENT}20`, border: `1px solid ${ACCENT}40`,
              color: ACCENT, fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            <Plus size={10} />
            New
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={11} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search transitions..."
            style={{
              width: '100%', paddingLeft: 26, padding: '5px 8px 5px 26px',
              background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
              borderRadius: 6, color: 'var(--color-text)', fontSize: 10, outline: 'none',
              fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)' }}>
        {[
          { id: 'templates' as const, icon: <Star size={10} />, label: 'Templates' },
          { id: 'mine' as const, icon: <User size={10} />, label: `Mine (${userTransitions.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              padding: '6px 0', fontSize: 10, fontWeight: 600,
              background: 'transparent', border: 'none', borderBottom: `2px solid ${activeTab === tab.id ? ACCENT : 'transparent'}`,
              color: activeTab === tab.id ? ACCENT : 'rgba(255,255,255,0.4)',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 120ms ease',
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category filter (templates only) */}
      {activeTab === 'templates' && (
        <div style={{ display: 'flex', gap: 4, padding: '6px 10px', overflowX: 'auto', borderBottom: '1px solid var(--color-border)', flexShrink: 0 }}>
          {(['All', ...CATEGORIES] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as TransitionCategory | 'All')}
              style={{
                padding: '2px 8px', borderRadius: 4, fontSize: 8, fontWeight: 700, whiteSpace: 'nowrap',
                border: `1px solid ${selectedCategory === cat ? ACCENT + '60' : 'rgba(255,255,255,0.08)'}`,
                background: selectedCategory === cat ? `${ACCENT}15` : 'rgba(255,255,255,0.03)',
                color: selectedCategory === cat ? ACCENT : 'rgba(255,255,255,0.4)',
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {activeTab === 'templates' && filteredTemplates.map(t => (
          <TransitionCard
            key={t.id}
            transition={t}
            selected={editingTransitionId === t.id}
            onSelect={() => setEditingTransition(t.id)}
            onDuplicate={() => handleDuplicate(t.id)}
            onEdit={() => {
              // Templates must be duplicated first to edit
              const newId = duplicateTransition(t.id);
              setEditingTransition(newId);
            }}
          />
        ))}

        {activeTab === 'mine' && filteredUser.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px 16px', color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>
            <Zap size={24} style={{ marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
            No custom transitions yet.
            <br />
            <span style={{ color: ACCENT, cursor: 'pointer', fontWeight: 700 }} onClick={handleCreate}>
              Create one
            </span>{' '}
            or duplicate a template.
          </div>
        )}

        {activeTab === 'mine' && filteredUser.map(t => (
          <TransitionCard
            key={t.id}
            transition={t}
            selected={editingTransitionId === t.id}
            onSelect={() => setEditingTransition(t.id)}
            onDuplicate={() => handleDuplicate(t.id)}
            onDelete={() => deleteTransition(t.id)}
            onEdit={() => setEditingTransition(t.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Icon placeholder
const Zap: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
