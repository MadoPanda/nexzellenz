'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    
    // Simulate network delay for premium feel
    await new Promise(r => setTimeout(r, 800));

    if (username === 'admin' && password === 'admin') {
      document.cookie = "auth=true; path=/";
      router.push('/admin');
    } else {
      alert('Invalid credentials. Use admin/admin.');
      setIsPending(false);
    }
  };

  return (
    <div className="admin-portal" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '1.5rem',
      backgroundColor: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '30vw',
        height: '30vw',
        background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(255,107,0,0.02) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 0
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card"
        style={{ 
          width: '100%', 
          maxWidth: '440px', 
          padding: '3rem 2.5rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ 
              display: 'inline-flex', 
              padding: '1rem', 
              borderRadius: '1rem',
              background: 'rgba(0,229,255,0.05)',
              border: '1px solid rgba(0,229,255,0.1)',
              marginBottom: '1.5rem'
            }}
          >
            <ShieldCheck size={32} color="var(--accent)" />
          </motion.div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '0.75rem',
            background: 'linear-gradient(to bottom, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '4px'
          }}>
            ADMIN PORTAL
          </h1>
          <p style={{ 
            color: 'var(--text-muted)', 
            fontFamily: "'JetBrains Mono', monospace", 
            fontSize: '0.8rem',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            Nexzellenz Secure Access
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1.75rem' }}>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <label style={{ 
              fontSize: '0.75rem', 
              color: 'var(--accent)', 
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 500
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                required
                className="glass-input"
                placeholder="Enter admin ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <label style={{ 
              fontSize: '0.75rem', 
              color: 'var(--accent)', 
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 500
            }}>
              Password
            </label>
            <input 
              type="password" 
              required
              className="glass-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isPending}
            style={{ 
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              opacity: isPending ? 0.7 : 1,
              cursor: isPending ? 'not-allowed' : 'pointer'
            }}
          >
            {isPending ? 'Authenticating...' : (
              <>
                Initialize Access <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ 
          marginTop: '2.5rem', 
          textAlign: 'center', 
          borderTop: '1px solid rgba(0,229,255,0.05)',
          paddingTop: '1.5rem'
        }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} Nexzellenz Technologies LLP<br/>
            Precision manufacturing • Protected node
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
