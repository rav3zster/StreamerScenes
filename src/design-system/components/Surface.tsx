import React from 'react';

export type SurfaceLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: SurfaceLevel;
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(({
  level = 2,
  style,
  children,
  ...props
}, ref) => {
  const surfaceStyle: React.CSSProperties = {
    background: `var(--surface-${level})`,
    color: 'var(--color-text)',
    ...style,
  };

  return (
    <div ref={ref} style={surfaceStyle} {...props}>
      {children}
    </div>
  );
});

Surface.displayName = 'Surface';
