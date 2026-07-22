import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Film, Layout, Zap, Save, Eye, Radio, Sun, Moon,
  ExternalLink, Maximize2, ArrowRight,
} from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { WIDGET_CATEGORIES } from '../data/widgetCatalog';
import { persistenceService } from '../persistence/persistenceService';

interface CommandItem {
  id: string;
  category: 'Scenes' | 'Commands' | 'Add Widget';
  icon: React.ReactNode;
  label: string;
  detail?: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    scenes, editingSceneId, setEditingScene,
    togglePreviewMode, switchDraftToLive,
    setAppView, addWidget, zoomToFit,
  } = useEditorStore();

  // Listen for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  if (!open) return null;

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

  const handleToggleTheme = () => {
    const next = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleSave = () => {
    const s = useEditorStore.getState();
    persistenceService.saveProject({
      projectName: s.projectName,
      scenes: s.scenes,
      liveSceneId: s.liveSceneId,
      editingSceneId: s.editingSceneId,
      updatedAt: Date.now(),
    });
  };

  // Build command list
  const commands: CommandItem[] = [
    // Scenes
    ...scenes.map(s => ({
      id: `scene-${s.id}`,
      category: 'Scenes' as const,
      icon: <Film size={14} style={{ color: 'var(--color-accent)' }} />,
      label: `Switch to ${s.label}`,
      detail: `${s.widgets.length} widgets`,
      action: () => {
        setEditingScene(s.id);
        setOpen(false);
      },
    })),

    // App Commands
    {
      id: 'cmd-preview',
      category: 'Commands',
      icon: <Eye size={14} />,
      label: 'Toggle Fullscreen Preview Mode',
      detail: 'Esc to exit',
      action: () => {
        togglePreviewMode();
        setOpen(false);
      },
    },
    {
      id: 'cmd-go-live',
      category: 'Commands',
      icon: <Radio size={14} style={{ color: '#ef4444' }} />,
      label: 'Switch Draft Scene To Live Broadcast',
      detail: 'Syncs active scene to OBS',
      action: () => {
        switchDraftToLive();
        setOpen(false);
      },
    },
    {
      id: 'cmd-save',
      category: 'Commands',
      icon: <Save size={14} />,
      label: 'Save Project',
      detail: 'Auto-saves locally',
      action: () => {
        handleSave();
        setOpen(false);
      },
    },
    {
      id: 'cmd-obs-setup',
      category: 'Commands',
      icon: <ExternalLink size={14} />,
      label: 'Open OBS Setup Guide',
      detail: 'Browser source settings',
      action: () => {
        setAppView('obs-setup');
        setOpen(false);
      },
    },
    {
      id: 'cmd-transitions',
      category: 'Commands',
      icon: <Zap size={14} style={{ color: 'var(--color-accent)' }} />,
      label: 'Open Transition Studio',
      detail: 'V0.7 Scene Transitions',
      action: () => {
        setAppView('transition-studio');
        setOpen(false);
      },
    },
    {
      id: 'cmd-theme-toggle',
      category: 'Commands',
      icon: currentTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />,
      label: `Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`,
      action: () => {
        handleToggleTheme();
        setOpen(false);
      },
    },
    {
      id: 'cmd-zoom-fit',
      category: 'Commands',
      icon: <Maximize2 size={14} />,
      label: 'Fit Canvas to Screen',
      action: () => {
        zoomToFit();
        setOpen(false);
      },
    },

    // Quick Add Widgets from Catalog
    ...Object.entries(WIDGET_CATEGORIES).flatMap(([catName, widgetList]) =>
      widgetList.map(w => ({
        id: `widget-${w.type}`,
        category: 'Add Widget' as const,
        icon: <Layout size={14} />,
        label: `Add ${w.label}`,
        detail: catName,
        action: () => {
          if (editingSceneId) {
            const maxZ = useEditorStore.getState().getDraftWidgets().reduce((m, widget) => Math.max(m, widget.zIndex), 0);
            useEditorStore.getState().addRecentWidget(w.type);
            addWidget({
              id: `w-${crypto.randomUUID()}`,
              type: w.type,
              label: w.label,
              x: 200, y: 200,
              width: w.defaultWidth,
              height: w.defaultHeight,
              rotation: 0, opacity: 100, scale: 1, zIndex: maxZ + 1,
              visible: true, locked: false,
              style: w.defaultStyle || {},
              animation: { type: 'none', duration: 1, delay: 0, loop: false },
              content: { type: w.type, settings: {} },
            });
          }
          setOpen(false);
        },
      }))
    ),
  ];

  // Filter commands
  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase()) ||
    (c.detail && c.detail.toLowerCase().includes(query.toLowerCase()))
  );

  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => (i + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => (i - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 580,
          background: 'var(--surface-5, #1e1b2e)',
          borderRadius: 'var(--radius-xl, 12px)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl, 0 24px 64px rgba(0,0,0,0.65))',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '65vh',
        }}
      >
        {/* Search header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 18px',
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--surface-4, #141222)',
          }}
        >
          <Search size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInput}
            placeholder="Type a command, scene, or widget... (Ctrl+K)"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--color-text)',
              fontSize: 14,
              fontFamily: 'var(--font-sans)',
            }}
          />
          <kbd
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 4,
              padding: '2px 6px',
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-muted)',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>
              No matching commands or widgets found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 12px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    background: isSelected ? 'var(--color-accent-alpha-15)' : 'transparent',
                    color: isSelected ? 'var(--color-text)' : 'var(--color-text-2)',
                    transition: 'all 100ms ease-out',
                  }}
                >
                  <span style={{ color: isSelected ? 'var(--color-accent)' : 'var(--color-text-muted)', flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: isSelected ? 600 : 400 }}>
                    {item.label}
                  </span>
                  {item.detail && (
                    <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {item.detail}
                    </span>
                  )}
                  <span style={{ fontSize: 10, color: 'var(--color-text-muted)', opacity: isSelected ? 1 : 0 }}>
                    <ArrowRight size={12} />
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
