'use client';

import { Shield, User, Bell, Database, Lock, Save, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('Profile Settings');
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Nex Admin',
    email: 'admin@nexzellenz.tech',
    bio: 'Overseeing high-precision manufacturing nodes and industrial 3D printing workflows.',
    idCode: 'ADM-042'
  });

  const [security, setSecurity] = useState({
    username: 'admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('nex_admin_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    
    // In a real app, security settings wouldn't be in localStorage like this, 
    // but for this mock, we'll just handle the profile for now.
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1000));
    
    localStorage.setItem('nex_admin_profile', JSON.stringify(profile));
    setIsSaving(false);
    toast.success('Protocol updated: Profile settings saved');
    
    // Dispatch custom event for real-time synchronization
    window.dispatchEvent(new Event('nex-settings-updated'));
  };

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      toast.error('Protocol mismatch: Passwords do not match');
      return;
    }
    
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    
    // Mock update
    setIsSaving(false);
    toast.success('Security protocol updated successfully');
    setSecurity({ ...security, currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const tabs = [
    { name: 'Profile Settings', icon: <User size={18} /> },
    { name: 'Security & Auth', icon: <Shield size={18} /> },
    { name: 'Notifications', icon: <Bell size={18} /> },
    { name: 'Data Management', icon: <Database size={18} /> },
    { name: 'API Configuration', icon: <Lock size={18} /> },
  ];

  return (
    <div className="admin-portal" style={{ display: 'grid', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          SYSTEM SETTINGS
        </h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem' }}>
          Configuring Nexzellenz node parameters & Security protocols.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
        {/* Settings Navigation */}
        <div className="glass-card" style={{ padding: '1rem' }}>
          <nav style={{ display: 'grid', gap: '0.5rem' }}>
            {tabs.map((item) => (
              <button 
                key={item.name} 
                onClick={() => setActiveTab(item.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: activeTab === item.name ? 'rgba(0, 229, 255, 0.05)' : 'none',
                  color: activeTab === item.name ? 'var(--accent)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Form Content */}
        <div className="glass-card" style={{ padding: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px', marginBottom: '2rem' }}>
            {activeTab.toUpperCase()}
          </h2>
          
          {activeTab === 'Profile Settings' && (
            <form onSubmit={handleSaveProfile} style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                  <input 
                    className="glass-input" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>ID Code</label>
                  <input className="glass-input" value={profile.idCode} disabled />
                </div>
              </div>

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Public Email</label>
                <input 
                  className="glass-input" 
                  value={profile.email} 
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Bio / Manufacturer Signature</label>
                <textarea 
                  className="glass-input" 
                  style={{ minHeight: '120px', resize: 'none' }} 
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                />
              </div>

              <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={isSaving}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: isSaving ? 0.7 : 1 }}
                >
                  {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {isSaving ? 'Processing...' : 'Save Protocol'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'Security & Auth' && (
            <form onSubmit={handleSaveSecurity} style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Administrative Username</label>
                <input className="glass-input" value={security.username} disabled />
              </div>

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Password</label>
                <input 
                  type="password" 
                  className="glass-input" 
                  placeholder="••••••••"
                  value={security.currentPassword}
                  onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>New Password</label>
                  <input 
                    type="password" 
                    className="glass-input" 
                    placeholder="••••••••"
                    value={security.newPassword}
                    onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                  />
                </div>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Confirm Password</label>
                  <input 
                    type="password" 
                    className="glass-input" 
                    placeholder="••••••••"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                  />
                </div>
              </div>

              <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={isSaving}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: isSaving ? 0.7 : 1 }}
                >
                  {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {isSaving ? 'Updating Node...' : 'Update Security'}
                </button>
              </div>
            </form>
          )}

          {['Notifications', 'Data Management', 'API Configuration'].includes(activeTab) && (
            <div style={{ padding: '4rem 0', textAlign: 'center' }}>
              <div style={{ color: 'var(--accent)', marginBottom: '1rem', opacity: 0.5 }}>
                <Database size={48} style={{ margin: '0 auto' }} />
              </div>
              <h3 style={{ color: 'var(--text)', marginBottom: '0.5rem' }}>Module in Development</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>The {activeTab} protocol is currently being provisioned for this administrative node.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
