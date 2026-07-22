import React from 'react';

export interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: number | string;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
}

export const Inline = React.forwardRef<HTMLDivElement, InlineProps>(({
  spacing = 8,
  align = 'center',
  justify = 'flex-start',
  wrap = false,
  style,
  children,
  ...props
}, ref) => {
  const inlineStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: typeof spacing === 'number' ? `${spacing}px` : spacing,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...style,
  };

  return (
    <div ref={ref} style={inlineStyle} {...props}>
      {children}
    </div>
  );
});

Inline.displayName = 'Inline';
