import React, { useEffect, useState } from 'react';
import { Sparkles, FolderOpen, Clock, ChevronRight, Zap } from 'lucide-react';
import { useWizardStore } from '../../store/wizardStore';
import { useEditorStore } from '../../store/editorStore';
import { persistenceService } from '../../persistence/persistenceService';

interface SavedProject {
  projectName: string;
  updatedAt: number;
  sceneCount: number;
}

export const StepWelcome: React.FC = () => {
  const { setStep, selectPack } = useWizardStore();
  const { loadProjectData } = useEditorStore();
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

  const handleContinue = async () => {
    const data = await persistenceService.loadProject();
    if (data) {
      loadProjectData(data);
    }
  };

  const handleNew = () => {
    selectPack('');
    setStep(1);
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
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      flex: 1, padding: '0 24px', position: 'relative',
    }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 4,
          textTransform: 'uppercase', color: 'rgba(168,85,247,0.7)',
          marginBottom: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Zap size={11} />
          Professional Broadcast Studio
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 900, letterSpacing: -2,
          color: '#fff', lineHeight: 1.0,
          margin: 0, marginBottom: 14,
        }}>
          Create Your<br />
          <span style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #5cffe2 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Stream Overlay</span>
        </h1>
        <p style={{
          fontSize: 15, color: 'rgba(255,255,255,0.4)', fontWeight: 400,
          lineHeight: 1.6, maxWidth: 440, margin: '0 auto',
        }}>
          Choose a professionally designed pack. Everything is already built — just personalize and go live.
        </p>
      </div>

      {/* Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: savedProject ? '1fr 1fr' : '1fr',
        gap: 14, width: '100%', maxWidth: 560,
      }}>
        {savedProject && !isLoading && (
          <button
            onClick={handleContinue}
            style={{
              background: 'rgba(16, 14, 32, 0.7)',
              border: '1px solid rgba(92, 255, 226, 0.25)',
              borderRadius: 18, padding: '24px 22px',
              cursor: 'pointer', textAlign: 'left',
              transition: 'all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              backdropFilter: 'blur(16px)',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(92,255,226,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(92,255,226,0.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(92,255,226,0.25)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(92,255,226,0.1)', border: '1px solid rgba(92,255,226,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={15} color="#5cffe2" />
              </div>
              <div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Continue Project</div>
              </div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {savedProject.projectName}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
              {savedProject.sceneCount} scene{savedProject.sceneCount !== 1 ? 's' : ''} · {formatDate(savedProject.updatedAt)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#5cffe2', fontWeight: 600 }}>
              Open Editor <ChevronRight size={11} />
            </div>
          </button>
        )}

        <button
          onClick={handleNew}
          style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(236,72,153,0.08) 100%)',
            border: '1px solid rgba(168,85,247,0.3)',
            borderRadius: 18, padding: '24px 22px',
            cursor: 'pointer', textAlign: 'left',
            transition: 'all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            backdropFilter: 'blur(16px)',
            position: 'relative', overflow: 'hidden',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.7)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(168,85,247,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
        >
          <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(168,85,247,0.4)' }}>
              <Sparkles size={15} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 9, color: 'rgba(168,85,247,0.7)', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Get Started</div>
            </div>
          </div>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Create New Stream</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
            Choose a Broadcast Pack, personalize it, and go live in minutes.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#a855f7', fontWeight: 700, marginTop: 6 }}>
            Get Started <ChevronRight size={12} />
          </div>
        </button>
      </div>

      {/* Bottom tip */}
      <div style={{
        position: 'absolute', bottom: 28,
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 10, color: 'rgba(255,255,255,0.2)',
      }}>
        <FolderOpen size={10} />
        Projects auto-save to your browser
      </div>
    </div>
  );
};
