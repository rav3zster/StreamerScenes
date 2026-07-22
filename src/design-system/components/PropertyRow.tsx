import React from 'react';

export interface PropertyRowProps {
  label: string;
  subLabel?: string;
  control: React.ReactNode;
  hint?: string;
}

export const PropertyRow: React.FC<PropertyRowProps> = ({
  label,
  subLabel,
  control,
  hint,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span style={{ fontSize: 11, color: 'var(--color-text-2)', fontWeight: 500 }}>{label}</span>
        {subLabel && <span style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>{subLabel}</span>}
      </div>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
        {control}
      </div>
    </div>
  );
};
