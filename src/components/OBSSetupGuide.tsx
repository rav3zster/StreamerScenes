import React, { useState } from 'react';
import { Copy, Check, ExternalLink, ArrowLeft, Monitor, Settings, Globe, BookOpen } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

const OUTPUT_URL = 'http://localhost:5173/output';
const RECOMMENDED_WIDTH = 1920;
const RECOMMENDED_HEIGHT = 1080;
const RECOMMENDED_FPS = 60;

const STEPS = [
  {
    title: 'Open OBS Studio',
    desc: 'Launch OBS Studio on your computer. Make sure you have the latest version installed.',
  },
  {
    title: 'Create or Select a Scene',
    desc: 'In the "Scenes" panel (bottom-left), click "+" to add a new scene, or select an existing one where you want the overlay to appear.',
  },
  {
    title: 'Add a Browser Source',
    desc: 'In the "Sources" panel (center), click the "+" button, then select "Browser" from the list.',
  },
  {
    title: 'Configure the Browser Source',
    desc: 'Name it "VibeOverlay Overlay" and click OK.',
  },
  {
    title: 'Enter the Overlay URL',
    desc: 'Paste the URL below into the URL field. Set the width and height to the recommended values.',
  },
  {
    title: 'Set Advanced Properties',
    desc: 'Check "Refresh browser when scene becomes active" for live sync. Optionally, enable "Use alpha channel" if your background is transparent.',
  },
  {
    title: 'Click OK and Position',
    desc: 'Click OK to add the source. Resize and reposition it to cover the full canvas. Right-click → Transform → Fit to screen for easy alignment.',
  },
  {
    title: 'Go Live!',
    desc: 'Your overlay is now ready. Click "Start streaming" or "Start Recording" in OBS to see it in action.',
  },
];

export const OBSSetupGuide: React.FC = () => {
  const { setAppView } = useEditorStore();
  const [copied, setCopied] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(OUTPUT_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = OUTPUT_URL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#06040d',
      backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,92,246,0.10) 0%, transparent 55%)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'Outfit, Inter, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)',
        flexShrink: 0,
      }}>
        <button
          onClick={() => setAppView('editor')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '7px 14px',
            color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
        >
          <ArrowLeft size={13} /> Back to Editor
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Monitor size={16} color="#a855f7" />
          <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>OBS Setup Guide</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28, padding: '28px' }}>
        {/* Left: Step-by-step guide */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0, marginBottom: 6 }}>
            How to Connect to OBS
          </h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0, marginBottom: 20 }}>
            Follow these steps to add your overlay as a Browser Source in OBS Studio
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STEPS.map((step, idx) => {
              const isExpanded = expandedStep === idx;
              const isDone = expandedStep !== null && idx < expandedStep;
              return (
                <div
                  key={idx}
                  onClick={() => setExpandedStep(isExpanded ? null : idx)}
                  style={{
                    background: isExpanded ? 'rgba(168,85,247,0.06)' : 'rgba(12,10,22,0.5)',
                    border: isExpanded
                      ? '1px solid rgba(168,85,247,0.25)'
                      : isDone
                      ? '1px solid rgba(16,185,129,0.15)'
                      : '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 12, padding: '14px 16px',
                    cursor: 'pointer', transition: 'all 200ms ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 800,
                      background: isDone
                        ? 'rgba(16,185,129,0.15)'
                        : isExpanded
                        ? 'linear-gradient(135deg, #a855f7, #ec4899)'
                        : 'rgba(255,255,255,0.06)',
                      color: isDone ? '#10b981' : isExpanded ? '#fff' : 'rgba(255,255,255,0.3)',
                      flexShrink: 0,
                    }}>
                      {isDone ? <Check size={12} /> : idx + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: isExpanded ? '#fff' : 'rgba(255,255,255,0.7)' }}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={{
                      marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)',
                      fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6,
                    }}>
                      {step.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Info panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* URL Copy Card */}
          <div style={{
            background: 'rgba(92,255,226,0.04)', border: '1px solid rgba(92,255,226,0.2)',
            borderRadius: 14, padding: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Globe size={13} color="#5cffe2" />
              <span style={{ fontSize: 10, fontWeight: 800, color: '#5cffe2', letterSpacing: 1, textTransform: 'uppercase' }}>
                Browser Source URL
              </span>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.4)', borderRadius: 8, padding: '10px 12px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.6)',
              wordBreak: 'break-all', marginBottom: 10,
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              {OUTPUT_URL}
            </div>
            <button
              onClick={handleCopy}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                width: '100%', padding: '9px 0', borderRadius: 8, border: 'none',
                background: copied ? 'rgba(16,185,129,0.15)' : '#5cffe2',
                color: copied ? '#10b981' : '#000',
                fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 200ms ease',
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied!' : 'Copy URL'}
            </button>
          </div>

          {/* Recommended Settings */}
          <div style={{
            background: 'rgba(12,10,22,0.6)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, padding: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <Settings size={13} color="rgba(255,255,255,0.4)" />
              <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase' }}>
                Recommended Settings
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <SettingCard label="Resolution" value={`${RECOMMENDED_WIDTH}×${RECOMMENDED_HEIGHT}`} />
              <SettingCard label="FPS" value={`${RECOMMENDED_FPS}`} />
              <SettingCard label="Width" value={`${RECOMMENDED_WIDTH}px`} />
              <SettingCard label="Height" value={`${RECOMMENDED_HEIGHT}px`} />
            </div>

            <div style={{ marginTop: 12, padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <BookOpen size={11} color="rgba(255,255,255,0.3)" />
                <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Tip</span>
              </div>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                Enable "Refresh browser when scene becomes active" to auto-sync overlay changes when switching scenes in OBS.
              </span>
            </div>
          </div>

          {/* Open Output */}
          <button
            onClick={() => window.open('/output', '_blank')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '10px 0', borderRadius: 10, border: '1px solid rgba(168,85,247,0.3)',
              background: 'rgba(168,85,247,0.08)', color: '#a855f7',
              fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(168,85,247,0.08)'; }}
          >
            <ExternalLink size={13} /> Open Output Page
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Setting Card ─────────────────────────────────────────────────────────────

const SettingCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 8, padding: '8px 10px', textAlign: 'center',
  }}>
    <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono, monospace' }}>
      {value}
    </div>
    <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>
      {label}
    </div>
  </div>
);
