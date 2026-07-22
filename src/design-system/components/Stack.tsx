import React from 'react';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: number | string;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(({
  spacing = 8,
  align = 'stretch',
  justify = 'flex-start',
  style,
  children,
  ...props
}, ref) => {
  const stackStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: typeof spacing === 'number' ? `${spacing}px` : spacing,
    alignItems: align,
    justifyContent: justify,
    ...style,
  };

  return (
    <div ref={ref} style={stackStyle} {...props}>
      {children}
    </div>
  );
});

Stack.displayName = 'Stack';
