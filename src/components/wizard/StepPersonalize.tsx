import React from 'react';
import { User, AtSign, Image, Palette, Globe, Camera, Clock } from 'lucide-react';
import { useWizardStore } from '../../store/wizardStore';
import { STREAM_PACKS } from '../../data/streamPacks';

const PLATFORMS = [
  { key: 'twitch', label: 'Twitch', color: '#9146ff' },
  { key: 'twitter', label: 'Twitter / X', color: '#1da1f2' },
  { key: 'youtube', label: 'YouTube', color: '#ff0000' },
  { key: 'discord', label: 'Discord', color: '#5865f2' },
  { key: 'instagram', label: 'Instagram', color: '#e4405f' },
  { key: 'tiktok', label: 'TikTok', color: '#000000' },
];

const CAMERA_STYLES = [
  { id: 'default', label: 'Default' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'neon', label: 'Neon' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'glass', label: 'Glass' },
];

const AdvancedUrlInput: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
          fontSize: 9, fontWeight: 600, cursor: 'pointer', padding: 0, textAlign: 'left',
          display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content'
        }}
      >
        <span>{open ? '▼' : '▶'}</span> Advanced: Paste Image URL
      </button>
      {open && (
        <input
          value={value.startsWith('data:') ? '' : value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://example.com/image.png"
          style={{
            width: '100%', padding: '5px 8px', borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(0,0,0,0.3)', color: '#fff',
            fontSize: 10, fontFamily: 'var(--font-mono)', outline: 'none',
            marginTop: 6, boxSizing: 'border-box'
          }}
        />
      )}
    </div>
  );
};

export const StepPersonalize: React.FC = () => {
  const { streamerProfile, setStreamerProfile, selectedPackId } = useWizardStore();

  const pack = STREAM_PACKS.find(p => p.id === selectedPackId);
  const accentColor = pack?.accentColor || '#a855f7';

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setStreamerProfile({ logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setStreamerProfile({ avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const setHandle = (platform: string, handle: string) => {
    const updated = streamerProfile.socialHandles.map(h =>
      h.platform === platform ? { ...h, handle } : h
    );
    if (!updated.find(h => h.platform === platform)) {
      updated.push({ platform, handle });
    }
    setStreamerProfile({ socialHandles: updated });
  };

  const getHandle = (platform: string) =>
    streamerProfile.socialHandles.find(h => h.platform === platform)?.handle ?? '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', padding: '0 28px' }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0, marginBottom: 4 }}>
          Personalize Your Stream
        </h2>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          These details will be automatically placed into your overlay
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, paddingBottom: 24 }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <FieldCard icon={<User size={14} />} label="Streamer Name" accent={accentColor}>
            <input
              value={streamerProfile.streamerName}
              onChange={e => setStreamerProfile({ streamerName: e.target.value })}
              placeholder="Your display name"
              style={inputStyle}
            />
          </FieldCard>

          <FieldCard icon={<AtSign size={14} />} label="Channel Name" accent={accentColor}>
            <input
              value={streamerProfile.channelName}
              onChange={e => setStreamerProfile({ channelName: e.target.value })}
              placeholder="your_channel"
              style={inputStyle}
            />
          </FieldCard>

          <FieldCard icon={<Image size={14} />} label="Upload Logo" accent={accentColor}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {streamerProfile.logoUrl ? (
                  <img src={streamerProfile.logoUrl} alt="Logo Preview" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'contain', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>None</div>
                )}
                <label style={{
                  padding: '6px 12px', borderRadius: 6, background: `${accentColor}20`, border: `1px solid ${accentColor}40`,
                  color: accentColor, fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 150ms ease'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${accentColor}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${accentColor}20`; }}
                >
                  Choose File
                  <input type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
                </label>
                {streamerProfile.logoUrl && (
                  <button onClick={() => setStreamerProfile({ logoUrl: '' })} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 10, cursor: 'pointer' }}>Remove</button>
                )}
              </div>
              <AdvancedUrlInput value={streamerProfile.logoUrl} onChange={val => setStreamerProfile({ logoUrl: val })} />
            </div>
          </FieldCard>

          <FieldCard icon={<Image size={14} />} label="Upload Avatar (Optional)" accent={accentColor}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {streamerProfile.avatarUrl ? (
                  <img src={streamerProfile.avatarUrl} alt="Avatar Preview" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'contain', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>None</div>
                )}
                <label style={{
                  padding: '6px 12px', borderRadius: 6, background: `${accentColor}20`, border: `1px solid ${accentColor}40`,
                  color: accentColor, fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 150ms ease'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${accentColor}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${accentColor}20`; }}
                >
                  Choose File
                  <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                </label>
                {streamerProfile.avatarUrl && (
                  <button onClick={() => setStreamerProfile({ avatarUrl: '' })} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 10, cursor: 'pointer' }}>Remove</button>
                )}
              </div>
              <AdvancedUrlInput value={streamerProfile.avatarUrl} onChange={val => setStreamerProfile({ avatarUrl: val })} />
            </div>
          </FieldCard>

          <FieldCard icon={<Palette size={14} />} label="Accent Color" accent={accentColor}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: streamerProfile.accentColor, border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <input
                  type="color"
                  value={streamerProfile.accentColor}
                  onChange={e => setStreamerProfile({ accentColor: e.target.value })}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                />
              </div>
              <input
                value={streamerProfile.accentColor}
                onChange={e => setStreamerProfile({ accentColor: e.target.value })}
                style={{ ...inputStyle, flex: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}
              />
            </div>
          </FieldCard>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <FieldCard icon={<Globe size={14} />} label="Social Handles" accent={accentColor}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PLATFORMS.map(p => (
                <div key={p.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 70, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>{p.label}</span>
                  <input
                    value={getHandle(p.key)}
                    onChange={e => setHandle(p.key, e.target.value)}
                    placeholder={p.key === 'twitch' ? 'your_channel' : `@${p.key}`}
                    style={{
                      ...inputStyle, flex: 1,
                      borderLeft: `2px solid ${p.color}`,
                    }}
                  />
                </div>
              ))}
            </div>
          </FieldCard>

          <FieldCard icon={<Camera size={14} />} label="Camera Frame Style" accent={accentColor}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
              {CAMERA_STYLES.map(cs => {
                const isSelected = streamerProfile.cameraFrameStyle === cs.id;
                return (
                  <button
                    key={cs.id}
                    onClick={() => setStreamerProfile({ cameraFrameStyle: cs.id })}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                      padding: '8px 4px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
                      background: isSelected ? 'rgba(255,255,255,0.02)' : 'transparent',
                      border: isSelected ? `2px solid ${accentColor}` : '2px solid rgba(255,255,255,0.06)',
                      transition: 'all 150ms ease',
                      outline: 'none',
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {/* Visual miniature element */}
                    <div style={{
                      width: '100%', height: 32, borderRadius: cs.id === 'rounded' ? 6 : cs.id === 'glass' ? 4 : 2,
                      border: cs.id === 'minimal' ? '0.5px solid rgba(255,255,255,0.3)' : `1.5px solid ${isSelected ? accentColor : 'rgba(255,255,255,0.4)'}`,
                      background: cs.id === 'glass' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.2)',
                      boxShadow: cs.id === 'neon' ? `0 0 8px ${accentColor}` : 'none',
                      backdropFilter: cs.id === 'glass' ? 'blur(2px)' : 'none',
                      position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxSizing: 'border-box',
                    }}>
                      {cs.id === 'minimal' && (
                        <div style={{ position: 'absolute', inset: 2, border: `1px solid ${isSelected ? accentColor : 'rgba(255,255,255,0.5)'}`, opacity: 0.8 }} />
                      )}
                      <div style={{ fontSize: 6, color: isSelected ? accentColor : 'rgba(255,255,255,0.3)', fontWeight: 700 }}>CAM</div>
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, color: isSelected ? '#fff' : 'rgba(255,255,255,0.45)' }}>
                      {cs.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </FieldCard>

          <FieldCard icon={<Clock size={14} />} label="Countdown Default Duration" accent={accentColor}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <input
                type="range"
                min={60}
                max={1800}
                step={30}
                value={streamerProfile.countdownDuration}
                onChange={e => setStreamerProfile({ countdownDuration: parseInt(e.target.value) })}
                style={{ width: '100%', accentColor: accentColor }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                <span>1 min</span>
                <span style={{ color: accentColor, fontWeight: 700 }}>
                  {Math.floor(streamerProfile.countdownDuration / 60)}:{(streamerProfile.countdownDuration % 60).toString().padStart(2, '0')}
                </span>
                <span>30 min</span>
              </div>
            </div>
          </FieldCard>
        </div>
      </div>
    </div>
  );
};

// ─── Field Card ───────────────────────────────────────────────────────────────

const FieldCard: React.FC<{ icon: React.ReactNode; label: string; accent: string; children: React.ReactNode }> = ({ icon, label, accent, children }) => (
  <div style={{
    background: 'rgba(12,10,22,0.6)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 12, padding: '12px 14px',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
      <span style={{ color: accent, display: 'flex' }}>{icon}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</span>
    </div>
    {children}
  </div>
);

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '7px 10px', borderRadius: 7,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(0,0,0,0.3)', color: '#fff',
  fontSize: 12, outline: 'none', fontFamily: 'inherit',
  boxSizing: 'border-box', transition: 'border-color 150ms ease',
};
