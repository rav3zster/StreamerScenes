import React from 'react';

export type TypographyVariant =
  | 'display'
  | 'title'
  | 'sectionTitle'
  | 'panelTitle'
  | 'body'
  | 'bodySmall'
  | 'metadata'
  | 'caption'
  | 'microLabel'
  | 'code';

export interface TypographyProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TypographyVariant;
  color?: string;
  weight?: number | string;
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color,
  weight,
  as,
  style,
  children,
  ...props
}) => {
  const Component = as || (variant === 'display' || variant === 'title' ? 'h2' : 'span');

  const variantStyles: Record<TypographyVariant, React.CSSProperties> = {
    display: { fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 },
    title: { fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3 },
    sectionTitle: { fontSize: 14, fontWeight: 700, letterSpacing: '0.01em', lineHeight: 1.4 },
    panelTitle: { fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' },
    body: { fontSize: 13, fontWeight: 400, lineHeight: 1.5 },
    bodySmall: { fontSize: 12, fontWeight: 400, lineHeight: 1.4 },
    metadata: { fontSize: 11, fontWeight: 500, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' },
    caption: { fontSize: 10, fontWeight: 500, color: 'var(--color-text-muted)' },
    microLabel: { fontSize: 9, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' },
    code: { fontSize: 11, fontFamily: 'var(--font-mono)' },
  };

  const computedStyle: React.CSSProperties = {
    fontFamily: variant === 'code' || variant === 'metadata' ? 'var(--font-mono)' : 'var(--font-sans)',
    color: color || 'inherit',
    fontWeight: weight || variantStyles[variant].fontWeight,
    ...variantStyles[variant],
    ...style,
  };

  return (
    <Component style={computedStyle} {...props}>
      {children}
    </Component>
  );
};
