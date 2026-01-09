// File: src/components/DemoBanner.jsx
import React from 'react';
import { isDemoMode } from '../api/api';

export default function DemoBanner() {
  if (!isDemoMode()) {
    return null;
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '12px 20px',
      textAlign: 'center',
      fontSize: '0.9rem',
      fontWeight: '500',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      🎭 <strong>Demo Mode:</strong> This is a read-only demonstration of previous cases. 
      You can view all previous reports and analysis results, but cannot create new cases.
    </div>
  );
}

