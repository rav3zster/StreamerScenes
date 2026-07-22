import React, { useEffect, useState } from 'react';
import { Sparkles, FolderOpen, Plus, ChevronRight, Clock, Zap } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { persistenceService } from '../persistence/persistenceService';

interface SavedProject {
  projectName: string;
  updatedAt: number;
  sceneCount: number;
}

export const WelcomePage: React.FC = () => {
  const { setAppView, loadProjectData } = useEditorStore();
  const [savedProject, setSavedProject] = useState<SavedProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    persistenceService.loadProject().then(data => {
      if (data && data.scenes && data.scenes.length > 0) {
        setSavedProject({
          projectName: data.projectName,
          updatedAt: data.updatedAt,
          sceneCount: data.scenes.length,
        });
      }
      setIsLoading(false);
    });
  }, []);

  const handleContinueProject = async () => {
    const data = await persistenceService.loadProject();
    if (data) {
      loadProjectData(data);
    }
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = Math.floor(diff / 3_600_000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#05030a',
        backgroundImage: [
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.18) 0%, transparent 60%)',
          'radial-gradient(ellipse 50% 40% at 20% 80%, rgba(92, 255, 226, 0.06) 0%, transparent 50%)',
          'radial-gradient(ellipse 40% 30% at 80% 90%, rgba(236, 72, 153, 0.06) 0%, transparent 50%)',
        ].join(', '),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'Outfit, Inter, sans-serif',
      }}
    >
      {/* Subtle grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%)',
      }} />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'linear-gradient(135deg, var(--color-accent), #ec4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, boxShadow: '0 0 16px var(--color-accent-alpha-40)',
          }}>⚡</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>VibeOverlay <span style={{ color: 'var(--color-accent)' }}>Studio</span></div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>Professional OBS Overlay Studio</div>
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--color-accent-subtle)', border: '1px solid var(--color-accent-alpha-20)',
          borderRadius: 99, padding: '5px 12px', fontSize: 10, fontWeight: 700,
          color: 'var(--color-accent)', letterSpacing: 0.5,
        }}>
          <Sparkles size={10} />
          v2.0 — Architecture Rebuild
        </div>
      </div>

      {/* Hero wordmark */}
      <div style={{ textAlign: 'center', marginBottom: 56, position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 4,
          textTransform: 'uppercase', color: 'var(--color-accent)',
          marginBottom: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Zap size={11} />
          Professional Broadcast Studio
        </div>
        <h1 style={{
          fontSize: 'clamp(42px, 5vw, 72px)',
          fontWeight: 900, letterSpacing: -2,
          color: '#fff', lineHeight: 1.0,
          margin: 0, marginBottom: 16,
        }}>
          Start with a<br />
          <span style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #5cffe2 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Broadcast Pack</span>
        </h1>
        <p style={{
          fontSize: 16, color: 'rgba(255,255,255,0.4)', fontWeight: 400,
          lineHeight: 1.6, maxWidth: 480, margin: '0 auto',
        }}>
          Choose a professionally designed pack. Every scene, widget, and animation — already built.
        </p>
      </div>

      {/* Action cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: savedProject ? '1fr 1fr 1fr' : '1fr 1fr',
        gap: 16,
        width: '100%',
        maxWidth: savedProject ? 900 : 640,
        padding: '0 24px',
        position: 'relative', zIndex: 1,
      }}>

        {/* Continue / Recent Project */}
        {savedProject && !isLoading && (
          <button
            id="welcome-continue-project"
            onClick={handleContinueProject}
            style={{
              background: 'rgba(16, 14, 32, 0.7)',
              border: '1px solid rgba(92, 255, 226, 0.25)',
              borderRadius: 20,
              padding: '28px 24px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              backdropFilter: 'blur(16px)',
              display: 'flex', flexDirection: 'column', gap: 12,
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(92, 255, 226, 0.6)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(92,255,226,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(92, 255, 226, 0.25)';
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(92, 255, 226, 0.1)',
                border: '1px solid rgba(92, 255, 226, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Clock size={16} color="#5cffe2" />
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Continue Project</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {savedProject.projectName}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                {savedProject.sceneCount} scene{savedProject.sceneCount !== 1 ? 's' : ''} · {formatDate(savedProject.updatedAt)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#5cffe2', fontWeight: 600, marginTop: 4 }}>
              Open Editor <ChevronRight size={12} />
            </div>
          </button>
        )}

        {/* Browse Broadcast Packs */}
        <button
          id="welcome-browse-packs"
          onClick={() => setAppView('pack-browser')}
          style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(236,72,153,0.08) 100%)',
            border: '1px solid rgba(168,85,247,0.3)',
            borderRadius: 20,
            padding: '28px 24px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            backdropFilter: 'blur(16px)',
            display: 'flex', flexDirection: 'column', gap: 12,
            position: 'relative', overflow: 'hidden',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(168,85,247,0.7)';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 16px 40px rgba(168,85,247,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)';
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '';
          }}
        >
          {/* Glow orb */}
          <div style={{
            position: 'absolute', top: -30, right: -30,
            width: 100, height: 100,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--color-accent), #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px var(--color-accent-alpha-40)',
            }}>
              <Sparkles size={16} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--color-accent)', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Recommended</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Browse Broadcast Packs</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
              Choose from 20 professionally designed broadcast packages. Every scene included.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-accent)', fontWeight: 700, marginTop: 4 }}>
            Explore All Packs <ChevronRight size={13} />
          </div>
        </button>

        {/* New blank project */}
        <button
          id="welcome-new-blank"
          onClick={() => setAppView('pack-browser')}
          style={{
            background: 'rgba(12, 10, 22, 0.6)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 20,
            padding: '28px 24px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            backdropFilter: 'blur(16px)',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Plus size={16} color="rgba(255,255,255,0.6)" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: 6 }}>New Project</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>
              Start by selecting a Broadcast Pack, then customize everything in the editor.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 600, marginTop: 4 }}>
            Choose a Pack <ChevronRight size={13} />
          </div>
        </button>
      </div>

      {/* Bottom tagline */}
      <div style={{
        position: 'absolute', bottom: 28,
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 11, color: 'rgba(255,255,255,0.2)',
      }}>
        <FolderOpen size={11} />
        Projects auto-save to your browser
      </div>
    </div>
  );
};
