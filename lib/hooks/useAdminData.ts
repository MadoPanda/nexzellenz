'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

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

export const useAdminData = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [stock, setStock] = useState<StockItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        const { data: quoteData } = await supabase.from('quotes').select('*').order('date', { ascending: false });
        const { data: stockData } = await supabase.from('stock').select('*').order('name');

        if (quoteData) setQuotes(quoteData as Quote[]);
        if (stockData) setStock(stockData as StockItem[]);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();

        // Real-time Subscriptions
        const quoteChannel = supabase
            .channel('public:quotes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'quotes' }, () => {
                fetchData();
            })
            .subscribe();

        const stockChannel = supabase
            .channel('public:stock')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'stock' }, () => {
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(quoteChannel);
            supabase.removeChannel(stockChannel);
        };
    }, []);

    // Actions
    const updateQuoteStatus = async (id: string, status: QuoteStatus) => {
        const { error } = await supabase.from('quotes').update({ status }).eq('id', id);
        if (!error) fetchData();
    };

    const addStock = async (item: Omit<StockItem, 'id'>) => {
        const { error } = await supabase.from('stock').insert([item]);
        if (!error) fetchData();
    };

    const updateStock = async (id: string, amount: number) => {
        const currentItem = stock.find(s => s.id === id);
        if (currentItem) {
            const { error } = await supabase.from('stock').update({ stock: currentItem.stock + amount }).eq('id', id);
            if (!error) fetchData();
        }
    };

    const deleteStock = async (id: string) => {
        const { error } = await supabase.from('stock').delete().eq('id', id);
        if (!error) fetchData();
    };

    const editStock = async (id: string, updates: Partial<StockItem>) => {
        const { error } = await supabase.from('stock').update(updates).eq('id', id);
        if (!error) fetchData();
    };

    // Calculate Growth
    const calculateGrowth = () => {
        if (quotes.length === 0) return '0%';
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
