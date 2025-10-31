
import React from 'react';

export type TransactionType = 'income' | 'expense';
export type Theme = 'light' | 'dark';

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string; // Corresponds to Category id
  date: string; // ISO string format
  notes: string;
}
   