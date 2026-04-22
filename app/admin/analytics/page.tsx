'use client';

import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell 
} from 'recharts';
import { TrendingUp, Download } from 'lucide-react';

const quoteData = [
  { month: 'Jan', volume: 65, revenue: 1.2 },
  { month: 'Feb', volume: 82, revenue: 1.8 },
  { month: 'Mar', volume: 95, revenue: 2.1 },
  { month: 'Apr', volume: 110, revenue: 2.8 },
  { month: 'May', volume: 105, revenue: 2.5 },
  { month: 'Jun', volume: 140, revenue: 3.4 },
];

const materialData = [
  { name: 'SLA Resin', value: 450, color: 'var(--accent)' },
  { name: 'Ind. Nylon', value: 300, color: 'var(--accent2)' },
  { name: 'PETG', value: 180, color: 'var(--accent3)' },
  { name: 'PLA', value: 100, color: '#94a3b8' },
];

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('6 Months');

  return (
    <div className="admin-portal" style={{ display: 'grid', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            INDUSTRIAL ANALYTICS
          </h1>
          <p style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem' }}>
            Performance node metrics • Manufacturing throughput.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
             <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="glass-input"
              style={{ fontSize: '0.8rem', padding: '0.6rem 1rem', width: '160px', appearance: 'none', backgroundColor: '#060810' }}
            >
              {['30 Days', '3 Months', '6 Months', 'Yearly'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem' }}>
            <Download size={18} /> Export CSV
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Quote Volume Chart */}
        <div className="glass-card" style={{ padding: '2rem', height: '450px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}>Monthly Quote Volume</h3>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#10b981', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
              <TrendingUp size={14} /> +24% Growth
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={quoteData}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="var(--text-muted)" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              />
              <YAxis 
                stroke="var(--text-muted)" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(6, 8, 16, 0.95)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '0.75rem',
                  backdropFilter: 'blur(10px)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.8rem'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="volume" 
                stroke="var(--accent)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorVolume)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Material Distribution Chart */}
        <div className="glass-card" style={{ padding: '2rem', height: '450px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}>Material Throughput</h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>Grams / Month</span>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={materialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="var(--text-muted)" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              />
              <YAxis 
                stroke="var(--text-muted)" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(6, 8, 16, 0.95)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '0.75rem',
                  backdropFilter: 'blur(10px)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.8rem'
                }}
                cursor={{ fill: 'rgba(0, 229, 255, 0.05)' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {materialData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem', marginTop: '1rem' }}>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px', marginBottom: '1.5rem' }}>Node Insight Report</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.8', fontFamily: "'Inter', sans-serif" }}>
            The current manufacturing cycle shows a <span style={{ color: 'var(--accent)' }}>24.8% increase</span> in revenue efficiency due to optimized SLA curing schedules. <span style={{ color: 'var(--accent2)' }}>Industrial Nylon</span> is projected to surpass PETG in volume by Q3. Recommendation: Deploy an additional industrial-grade FDM unit to manage high-temp filament backlog and maintain current SLA throughput levels.
          </p>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>EFFICIENCY INDEX</p>
              <p style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--accent)' }}>0.94</p>
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>UPTIME PERCENTAGE</p>
              <p style={{ fontWeight: 700, fontSize: '1.25rem', color: '#10b981' }}>99.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
