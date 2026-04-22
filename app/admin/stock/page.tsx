'use client';

import React, { useState } from 'react';
import { AlertCircle, Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { useAdminData, StockItem } from '@/lib/hooks/useAdminData';
import { motion, AnimatePresence } from 'framer-motion';

const StockPage = () => {
  const { stock, addStock, editStock, deleteStock, isLoading } = useAdminData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'SLA',
    stock: 0,
    unit: 'kg',
    min: 1.0,
    price: 0
  });

  if (isLoading) return <div className="admin-portal" style={{ padding: '2rem' }}>Syncing Inventory...</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      editStock(editingItem.id, formData);
    } else {
      addStock(formData);
    }
    closeModal();
  };

  const openEditModal = (item: StockItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      type: item.type,
      stock: item.stock,
      unit: item.unit,
      min: item.min,
      price: item.price
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: '', type: 'SLA', stock: 0, unit: 'kg', min: 1.0, price: 0 });
  };

  return (
    <div className="admin-portal" style={{ display: 'grid', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
            STOCK MANAGER
          </h1>
          <p style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem' }}>
            Inventory control & Material node management.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <Plus size={18} /> Add Material
        </button>
      </header>

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(0,229,255,0.02)' }}>
              {['Material Name', 'Type', 'Current Stock', 'Min Level', 'Price (₹/kg)', 'Status', 'Actions'].map((h) => (
                <th key={h} style={{ 
                  padding: '1.25rem 1.5rem', 
                  fontSize: '0.7rem', 
                  color: 'var(--accent)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '2px',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(0,229,255,0.05)', transition: 'background 0.2s' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{item.name}</td>
                <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.type}</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ fontWeight: 700 }}>{item.stock}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>{item.unit}</span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>{item.min} {item.unit}</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>₹{item.price.toLocaleString()}</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  {item.stock < item.min ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f43f5e', fontSize: '0.75rem', fontWeight: 600 }}>
                      <AlertCircle size={14} /> LOW STOCK
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}>
                      <Check size={14} /> OPTIMAL
                    </span>
                  )}
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={() => openEditModal(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => deleteStock(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Backdrop */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ 
            position: 'fixed', inset: 0, 
            backgroundColor: 'rgba(6, 8, 16, 0.8)', 
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '1rem'
          }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card" 
              style={{ width: '100%', maxWidth: '500px', padding: '2.5rem', position: 'relative' }}
            >
              <button onClick={closeModal} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
              
              <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
                {editingItem ? 'EDIT MATERIAL' : 'ADD NEW MATERIAL'}
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Material Name</label>
                  <input 
                    className="glass-input" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Tough-Tech Resin"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Type</label>
                    <select 
                      className="glass-input" 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      style={{ appearance: 'none', backgroundColor: '#060810' }}
                    >
                      <option value="SLA">SLA</option>
                      <option value="FDM">FDM</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Price (₹/kg)</label>
                    <input 
                      type="number"
                      className="glass-input" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Initial Stock</label>
                    <input 
                      type="number" step="0.1"
                      className="glass-input" 
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>Min Threshold</label>
                    <input 
                      type="number" step="0.1"
                      className="glass-input" 
                      value={formData.min}
                      onChange={(e) => setFormData({...formData, min: Number(e.target.value)})}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                  {editingItem ? 'Save Changes' : 'Register Material'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StockPage;
