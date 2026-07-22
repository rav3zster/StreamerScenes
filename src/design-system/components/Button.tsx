import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'toggle' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'secondary',
  size = 'md',
  active = false,
  loading = false,
  icon,
  className = '',
  disabled,
  style,
  children,
  ...props
}, ref) => {
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: { padding: '4px 8px', fontSize: 11, borderRadius: 4, height: 26 },
    md: { padding: '6px 14px', fontSize: 12, borderRadius: 6, height: 32 },
    lg: { padding: '8px 18px', fontSize: 13, borderRadius: 8, height: 40 },
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    ghost: 'btn-icon',
    icon: 'btn-icon',
    toggle: `status-btn${active ? ' active' : ''}`,
    destructive: 'btn btn-danger',
  };

  const combinedClassName = `${variantClasses[variant]} focus-ring ${className}`.trim();

  return (
    <button
      ref={ref}
      className={combinedClassName}
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        fontFamily: 'var(--font-sans)',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    >
      {loading ? <span className="spinner" style={{ width: 12, height: 12 }} /> : icon}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
