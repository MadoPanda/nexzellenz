'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Package, Clock, ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react';
import { useAdminData, AdminAlert } from '@/lib/hooks/useAdminData';
import toast from 'react-hot-toast';

const OverviewPage = () => {
  const router = useRouter();
  const { quotes, stats, updateStock, alerts, isLoading } = useAdminData();

  if (isLoading) return <div className="admin-portal" style={{ padding: '2rem' }}>Loading Dashboard...</div>;

  const dashboardStats = [
    { name: 'Total Quotes', value: stats.totalQuotes, change: '+12.5%', icon: <TrendingUp size={20} />, trend: 'up', path: '/admin/quotes' },
    { name: 'Pending Review', value: stats.pendingQuotes, change: '+5.2%', icon: <Clock size={20} />, trend: 'up', path: '/admin/quotes' },
    { name: 'Low Stock Alert', value: stats.lowStockItems, change: stats.lowStockItems > 0 ? 'Action Needed' : 'Normal', icon: <Package size={20} />, trend: stats.lowStockItems > 0 ? 'down' : 'up', path: '/admin/stock' },
    { name: 'Monthly Growth', value: stats.monthlyGrowth, change: '+2.1%', icon: <Users size={20} />, trend: 'up', path: '/admin/analytics' },
  ];

  const handleAlertAction = (alert: AdminAlert) => {
    if (alert.targetId) {
      updateStock(alert.targetId, 5);
      toast.success(`${alert.message} Resolved: Stock provisioned.`);
    } else {
      toast.success(`Protocol initiated: ${alert.message} has been scheduled.`);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          DASHBOARD OVERVIEW
        </h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem' }}>
          Welcome back! Monitoring Nexzellenz node status.
        </p>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {dashboardStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => router.push(stat.path)}
            className="glass-card"
            style={{ padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                borderRadius: '0.5rem', 
                backgroundColor: 'rgba(0, 229, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                border: '1px solid rgba(0, 229, 255, 0.1)'
              }}>
                {stat.icon}
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                fontSize: '0.7rem',
                fontFamily: "'JetBrains Mono', monospace",
                color: stat.trend === 'up' ? '#10b981' : '#f43f5e',
                letterSpacing: '1px'
              }}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.name}</p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        {/* Recent Quotes */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}>Recent Quote Requests</h3>
            <button 
              onClick={() => router.push('/admin/quotes')}
              style={{ fontSize: '0.7rem', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", background: 'none', border: 'none', cursor: 'pointer' }}
            >
              View All
            </button>
          </div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {quotes.slice(0, 4).map((quote) => (
              <motion.div 
                key={quote.id} 
                whileHover={{ x: 5, backgroundColor: 'rgba(0, 229, 255, 0.05)' }}
                onClick={() => router.push(`/admin/quotes?id=${quote.id}`)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '1rem',
                  backgroundColor: 'rgba(0, 229, 255, 0.02)',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', fontFamily: "'JetBrains Mono', monospace" }}>{quote.project}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{quote.customer} • {quote.material}</p>
                </div>
                <span className={`status-badge ${quote.status.toLowerCase().replace(' ', '-')}`}>
                  {quote.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}>System Critical Alerts</h3>
            <AlertTriangle size={18} color={alerts.some(a => a.type === 'critical') ? '#f43f5e' : 'var(--accent)'} />
          </div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {alerts.length > 0 ? alerts.map(alert => (
              <motion.div 
                key={alert.id} 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                style={{ 
                  padding: '1.25rem', 
                  borderLeft: `4px solid ${alert.type === 'critical' ? '#f43f5e' : '#f59e0b'}`, 
                  backgroundColor: alert.type === 'critical' ? 'rgba(244, 63, 94, 0.05)' : 'rgba(245, 158, 11, 0.05)', 
                  borderRadius: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: alert.type === 'critical' ? '#f43f5e' : '#f59e0b', marginBottom: '0.2rem' }}>{alert.message}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{alert.details}</p>
                </div>
                {alert.action && (
                  <button 
                    onClick={() => handleAlertAction(alert)}
                    className="btn-primary" 
                    style={{ 
                      padding: '0.4rem 0.8rem', 
                      fontSize: '0.7rem', 
                      border: `1px solid ${alert.type === 'critical' ? '#f43f5e' : '#f59e0b'}`, 
                      color: alert.type === 'critical' ? '#f43f5e' : '#f59e0b',
                      textTransform: 'uppercase'
                    }}
                  >
                    {alert.action}
                  </button>
                )}
              </motion.div>
            )) : (
              <div style={{ 
                padding: '1.25rem', 
                borderLeft: '4px solid var(--accent)', 
                backgroundColor: 'rgba(0, 229, 255, 0.05)', 
                borderRadius: '0.5rem'
              }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.2rem' }}>All Systems Nominal</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Material levels and printer nodes are within parameters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default OverviewPage;
