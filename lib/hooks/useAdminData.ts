'use client';

import { useState, useEffect } from 'react';

export type QuoteStatus = 'Pending' | 'In Review' | 'Quoted' | 'Approved' | 'Completed' | 'Rejected';

export interface Quote {
    id: string;
    customer: string;
    project: string;
    material: string;
    quantity: number;
    status: QuoteStatus;
    date: string;
}

export interface StockItem {
    id: string;
    name: string;
    type: string;
    stock: number;
    unit: string;
    min: number;
    price: number;
}

export interface AdminAlert {
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    details: string;
    action?: string;
    targetId?: string;
}

const INITIAL_QUOTES: Quote[] = [
    { id: '101', customer: 'Aero Dynamics', project: 'NACA 0012 Test Wing', material: 'Industrial Nylon', quantity: 2, status: 'Pending', date: '2026-04-22' },
    { id: '102', customer: 'MedTech Hub', project: 'Bone Scaffold v4', material: 'High-Toughness Resin', quantity: 15, status: 'Quoted', date: '2026-04-21' },
    { id: '103', customer: 'AutoDesign Co', project: 'Gear Housing', material: 'PETG', quantity: 5, status: 'In Review', date: '2026-04-20' },
];

const INITIAL_STOCK: StockItem[] = [
    { id: '1', name: 'High-Toughness Resin', type: 'SLA', stock: 1.2, unit: 'kg', min: 2.0, price: 12500 },
    { id: '2', name: 'Industrial Nylon', type: 'FDM', stock: 8.5, unit: 'kg', min: 5.0, price: 4500 },
    { id: '3', name: 'PETG (Industrial)', type: 'FDM', stock: 12.0, unit: 'kg', min: 5.0, price: 3200 },
];

export const useAdminData = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [stock, setStock] = useState<StockItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = () => {
        const savedQuotes = localStorage.getItem('nex_admin_quotes');
        const savedStock = localStorage.getItem('nex_admin_stock');

        if (savedQuotes) setQuotes(JSON.parse(savedQuotes));
        else {
            setQuotes(INITIAL_QUOTES);
            localStorage.setItem('nex_admin_quotes', JSON.stringify(INITIAL_QUOTES));
        }

        if (savedStock) setStock(JSON.parse(savedStock));
        else {
            setStock(INITIAL_STOCK);
            localStorage.setItem('nex_admin_stock', JSON.stringify(INITIAL_STOCK));
        }
        setIsLoading(false);
    };

    // Load from localStorage on mount
    useEffect(() => {
        loadData();

        // Cross-tab Synchronization
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'nex_admin_quotes' || e.key === 'nex_admin_stock') {
                loadData();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Update localStorage when state changes
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('nex_admin_quotes', JSON.stringify(quotes));
        }
    }, [quotes, isLoading]);

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('nex_admin_stock', JSON.stringify(stock));
        }
    }, [stock, isLoading]);

    // Actions
    const updateQuoteStatus = (id: string, status: QuoteStatus) => {
        setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    };

    const addStock = (item: Omit<StockItem, 'id'>) => {
        const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
        setStock(prev => [...prev, newItem]);
    };

    const updateStock = (id: string, amount: number) => {
        setStock(prev => prev.map(s => s.id === id ? { ...s, stock: s.stock + amount } : s));
    };

    const deleteStock = (id: string) => {
        setStock(prev => prev.filter(s => s.id !== id));
    };

    const editStock = (id: string, updates: Partial<StockItem>) => {
        setStock(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    // Calculate Growth
    const calculateGrowth = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const currentMonthQuotes = quotes.filter(q => {
            const date = new Date(q.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        }).length;

        const lastMonthQuotes = quotes.filter(q => {
            const date = new Date(q.date);
            let lm = currentMonth - 1;
            let ly = currentYear;
            if (lm < 0) { lm = 11; ly--; }
            return date.getMonth() === lm && date.getFullYear() === ly;
        }).length;

        if (lastMonthQuotes === 0) return currentMonthQuotes > 0 ? '+100%' : '0%';
        const growth = ((currentMonthQuotes - lastMonthQuotes) / lastMonthQuotes) * 100;
        return `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`;
    };

    return {
        quotes,
        stock,
        isLoading,
        updateQuoteStatus,
        addStock,
        updateStock,
        deleteStock,
        editStock,
        stats: {
            totalQuotes: quotes.length,
            pendingQuotes: quotes.filter(q => q.status === 'Pending').length,
            lowStockItems: stock.filter(s => s.stock < s.min).length,
            monthlyGrowth: calculateGrowth()
        },
        alerts: [
            ...stock.filter(s => s.stock < s.min).map(s => ({
                id: `stock-${s.id}`,
                type: 'critical',
                message: `LOW STOCK: ${s.name}`,
                details: `Current: ${s.stock}${s.unit} (Threshold: ${s.min}${s.unit})`,
                action: 'Quick Restock',
                targetId: s.id
            })),
            {
                id: 'maint-1',
                type: 'warning',
                message: 'Maintenance Due',
                details: 'FDM Printer #4 requires nozzle calibration (Est. 30m).',
                action: 'Schedule',
            }
        ] as AdminAlert[]
    };
};
