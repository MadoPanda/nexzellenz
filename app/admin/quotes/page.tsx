'use client';

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useAdminData, Quote, QuoteStatus } from '@/lib/hooks/useAdminData';
import { Search, Filter, X, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const QuotesContent = () => {
  const { quotes, updateQuoteStatus, isLoading } = useAdminData();
  const searchParams = useSearchParams();
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle deep-linking
  React.useEffect(() => {
    const id = searchParams.get('id');
    if (id && quotes.length > 0) {
      const quote = quotes.find(q => q.id === id);
      if (quote) setSelectedQuote(quote);
    }
  }, [searchParams, quotes]);

  if (isLoading) return <div className="admin-portal" style={{ padding: '2rem' }}>Loading node data...</div>;

  const filteredQuotes = quotes.filter(q => 
    q.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    q.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusOptions: QuoteStatus[] = ['Pending', 'In Review', 'Quoted', 'Approved', 'Completed', 'Rejected'];

  const getStatusIcon = (status: QuoteStatus) => {
    switch (status) {
      case 'Pending': return <Clock size={14} color="#f59e0b" />;
      case 'Approved': return <CheckCircle size={14} color="#10b981" />;
      case 'Rejected': return <X size={14} color="#f43f5e" />;
      default: return <AlertCircle size={14} color="var(--accent)" />;
    }
  };

  return (
    <div className="admin-portal" style={{ display: 'grid', gap: '2rem' }}>
      <header>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
          QUOTE MANAGEMENT
        </h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem' }}>
          Reviewing & Authorizing manufacturing requests.
        </p>
      </header>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search by customer or project ID..." 
            className="glass-input"
            style={{ paddingLeft: '3rem', width: '100%' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="glass-card" style={{ padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Grid Container */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
        <AnimatePresence>
          {filteredQuotes.map((quote) => (
            <motion.div
              layout
              key={quote.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card"
              style={{ padding: '1.5rem', borderLeft: quote.status === 'Pending' ? '4px solid #f59e0b' : 'none' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.2rem' }}>{quote.project}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: #{quote.id} • {quote.date}</p>
                </div>
                <div className={`status-badge ${quote.status.toLowerCase().replace(' ', '-')}`}>
                  {quote.status}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--text-muted)' }}>Customer:</span> {quote.customer}</p>
                <p style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--text-muted)' }}>Material:</span> {quote.material}</p>
                <p style={{ fontSize: '0.85rem' }}><span style={{ color: 'var(--text-muted)' }}>Quantity:</span> {quote.quantity} Units</p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={() => setSelectedQuote(quote)}
                  className="btn-primary" 
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem', fontSize: '0.8rem' }}
                >
                  <Eye size={16} /> Details
                </button>
                <div style={{ position: 'relative' }}>
                  <select 
                    value={quote.status}
                    onChange={(e) => updateQuoteStatus(quote.id, e.target.value as QuoteStatus)}
                    className="glass-input"
                    style={{ fontSize: '0.7rem', padding: '0.5rem 1rem', width: '130px', appearance: 'none', backgroundColor: '#060810' }}
                  >
                    {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Quote Detail Modal */}
      <AnimatePresence>
        {selectedQuote && (
          <div style={{ 
            position: 'fixed', inset: 0, 
            backgroundColor: 'rgba(6, 8, 16, 0.9)', 
            backdropFilter: 'blur(15px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '1rem'
          }}>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="glass-card" 
              style={{ width: '100%', maxWidth: '700px', padding: '3rem', position: 'relative' }}
            >
              <button onClick={() => setSelectedQuote(null)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                {getStatusIcon(selectedQuote.status)}
                <h2 style={{ fontSize: '2rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
                  REQUEST DETAILED VIEW
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <section>
                  <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.75rem' }}>Customer Profile</label>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{selectedQuote.customer}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Industrial Tier • Active Node</p>
                </section>
                <section>
                  <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.75rem' }}>Project ID</label>
                  <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>#{selectedQuote.id} - {selectedQuote.project}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Established: {selectedQuote.date}</p>
                </section>
              </div>

              <div style={{ padding: '2rem', backgroundColor: 'rgba(0, 229, 255, 0.03)', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '1.5rem', fontFamily: "'JetBrains Mono', monospace" }}>Technical Specifications</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>MATERIAL</p>
                    <p style={{ fontWeight: 600 }}>{selectedQuote.material}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>QUANTITY</p>
                    <p style={{ fontWeight: 600 }}>{selectedQuote.quantity} Units</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>PRIORITY</p>
                    <p style={{ fontWeight: 600, color: '#f59e0b' }}>Standard</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={async () => { 
                    const id = selectedQuote.id;
                    toast.loading('Generating industrial quote protocol...', { id: 'quote-op' });
                    await new Promise(r => setTimeout(r, 1000));
                    updateQuoteStatus(id, 'Quoted'); 
                    setSelectedQuote(null); 
                    toast.success('Quote generated and dispatched successfully.', { id: 'quote-op' });
                  }}
                  className="btn-primary" 
                  style={{ flex: 1 }}
                >
                  Confirm & Generate Quote
                </button>
                <button 
                  onClick={async () => { 
                    const id = selectedQuote.id;
                    toast.loading('Deactivating request node...', { id: 'quote-op' });
                    await new Promise(r => setTimeout(r, 1000));
                    updateQuoteStatus(id, 'Rejected'); 
                    setSelectedQuote(null); 
                    toast.error('Request has been rejected and archived.', { id: 'quote-op' });
                  }}
                  style={{ flex: 1, padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #f43f5e', color: '#f43f5e', background: 'none', cursor: 'pointer' }}
                >
                  Reject Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

const QuotesPage = () => {
  return (
    <Suspense fallback={<div className="admin-portal" style={{ padding: '2rem' }}>Loading node data...</div>}>
      <QuotesContent />
    </Suspense>
  );
};

export default QuotesPage;
