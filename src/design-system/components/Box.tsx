import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: number | string;
  margin?: number | string;
  background?: string;
  borderRadius?: number | string;
  border?: string;
  elevation?: number;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(({
  padding,
  margin,
  background,
  borderRadius,
  border,
  elevation,
  style,
  children,
  ...props
}, ref) => {
  const boxStyle: React.CSSProperties = {
    padding: typeof padding === 'number' ? `${padding}px` : padding,
    margin: typeof margin === 'number' ? `${margin}px` : margin,
    background,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    border,
    boxShadow: elevation ? `var(--shadow-e${elevation})` : undefined,
    ...style,
  };

  return (
    <div ref={ref} style={boxStyle} {...props}>
      {children}
    </div>
  );
});

Box.displayName = 'Box';
