import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Global listener helper
type ToastListener = (toast: ToastMessage) => void;
const listeners = new Set<ToastListener>();

export const notify = (
  message: string,
  type: ToastMessage['type'] = 'info',
  action?: ToastMessage['action'],
  duration: number = 3000
) => {
  const toast: ToastMessage = {
    id: `toast-${Date.now()}-${Math.random()}`,
    message,
    type,
    action,
    duration,
  };
  listeners.forEach(l => l(toast));
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (toast: ToastMessage) => {
      setToasts(current => [...current.slice(-2), toast]); // Max 3 visible

      if (toast.duration && toast.duration > 0) {
        setTimeout(() => {
          setToasts(current => current.filter(t => t.id !== toast.id));
        }, toast.duration);
      }
    };

    listeners.add(handleToast);
    return () => {
      listeners.delete(handleToast);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 36,
        right: 20,
        zIndex: 100000,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        pointerEvents: 'none',
      }}
    >
      {toasts.map(t => {
        const icon =
          t.type === 'success' ? <CheckCircle2 size={15} style={{ color: '#10b981' }} /> :
          t.type === 'danger' ? <AlertCircle size={15} style={{ color: '#ef4444' }} /> :
          t.type === 'warning' ? <AlertTriangle size={15} style={{ color: '#f59e0b' }} /> :
          <Info size={15} style={{ color: 'var(--color-accent)' }} />;

        return (
          <div
            key={t.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              borderRadius: 8,
              background: 'var(--surface-4, #1a1828)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontSize: 12,
              fontWeight: 500,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              animation: 'toast-in 180ms cubic-bezier(0.0, 0.0, 0.2, 1)',
            }}
          >
            {icon}
            <span style={{ flex: 1 }}>{t.message}</span>
            {t.action && (
              <button
                className="btn btn-secondary focus-ring"
                style={{ fontSize: 10, padding: '2px 8px', height: 22 }}
                onClick={() => {
                  t.action?.onClick();
                  setToasts(current => current.filter(x => x.id !== t.id));
                }}
              >
                {t.action.label}
              </button>
            )}
            <button
              className="btn-icon"
              style={{ width: 18, height: 18, opacity: 0.5 }}
              onClick={() => setToasts(current => current.filter(x => x.id !== t.id))}
            >
              <X size={11} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
