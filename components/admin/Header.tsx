import React, { useState, useEffect } from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header = () => {
  const [adminName, setAdminName] = useState('NEX ADMIN');

  useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem('nex_admin_profile');
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);
          if (profile.name) {
            setAdminName(profile.name.toUpperCase());
          }
        } catch (e) {
          console.error('Failed to parse admin profile', e);
        }
      }
    };

    loadProfile();

    // Listen for custom events for real-time sync
    window.addEventListener('nex-settings-updated', loadProfile);
    // Also listen for storage events in case of multiple tabs
    window.addEventListener('storage', loadProfile);

    return () => {
      window.removeEventListener('nex-settings-updated', loadProfile);
      window.removeEventListener('storage', loadProfile);
    };
  }, []);

  return (
    <header style={{ 
      height: '5rem', 
      padding: '0 2rem', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'rgba(6, 8, 16, 0.5)',
      backdropFilter: 'blur(12px)',
      position: 'relative',
      zIndex: 50
    }}>
      <div style={{ position: 'relative', width: '300px' }}>
        <Search size={18} style={{ 
          position: 'absolute', 
          left: '1rem', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: 'var(--text-muted)' 
        }} />
        <input 
          type="text" 
          placeholder="System Search..." 
          style={{ 
            width: '100%', 
            padding: '0.6rem 1rem 0.6rem 3rem',
            backgroundColor: 'rgba(0, 229, 255, 0.03)',
            border: '1px solid var(--border)',
            borderRadius: '2rem',
            color: 'white',
            outline: 'none',
            fontSize: '0.8rem',
            fontFamily: "'JetBrains Mono', monospace"
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <Bell size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
          <span style={{ 
            position: 'absolute', 
            top: '-2px', 
            right: '-2px', 
            width: '8px', 
            height: '8px', 
            background: 'var(--accent2)', 
            borderRadius: '50%',
            border: '2px solid var(--bg)'
          }}></span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white', fontFamily: "'JetBrains Mono', monospace" }}>{adminName}</p>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase' }}>Manager</p>
          </div>
          <div style={{ 
            width: '2.5rem', 
            height: '2.5rem', 
            borderRadius: '50%', 
            backgroundColor: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--bg)'
          }}>
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
