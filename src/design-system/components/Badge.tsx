import React from 'react';

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'live' | 'draft' | 'locked';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  style,
  children,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    neutral: { background: 'rgba(255,255,255,0.08)', color: 'var(--color-text-2)', border: '1px solid var(--color-border)' },
    accent: { background: 'var(--color-accent-alpha-15)', color: 'var(--color-accent)', border: '1px solid var(--color-accent-alpha-30)' },
    success: { background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' },
    danger: { background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' },
    warning: { background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' },
    info: { background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' },
    live: { background: 'rgba(239,68,68,0.18)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.4)', fontWeight: 800 },
    draft: { background: 'rgba(255,255,255,0.06)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' },
    locked: { background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' },
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '2px 7px',
    borderRadius: 9999,
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-mono)',
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
    ...style,
  };

  return (
    <span style={badgeStyle} {...props}>
      {children}
    </span>
  );
};
