'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div
      className="pop-in"
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'var(--color-text-primary)',
        color: 'var(--color-text-inverse)',
        padding: '10px 20px',
        borderRadius: 'var(--radius-full)',
        fontSize: '13px',
        lineHeight: '18px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: 'var(--shadow-md)',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '18px',
          height: '18px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-success)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
        }}
      >
        <Check size={12} strokeWidth={2} />
      </div>
      <span>{toastMessage}</span>
    </div>
  );
};
