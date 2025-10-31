
import React from 'react';
import { Pizza, Bus, FileText, ShoppingCart, Banknote, PiggyBank, Briefcase, Gift, Home, HeartPulse, GraduationCap } from 'lucide-react';
import { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'food', name: 'Food', icon: Pizza, color: '#FF6384' },
  { id: 'transport', name: 'Transport', icon: Bus, color: '#36A2EB' },
  { id: 'bills', name: 'Bills', icon: FileText, color: '#FFCE56' },
  { id: 'shopping', name: 'Shopping', icon: ShoppingCart, color: '#4BC0C0' },
  { id: 'salary', name: 'Salary', icon: Banknote, color: '#22C55E' },
  { id: 'savings', name: 'Savings', icon: PiggyBank, color: '#9966FF' },
  { id: 'business', name: 'Business', icon: Briefcase, color: '#A9A9A9' },
  { id: 'gift', name: 'Gift', icon: Gift, color: '#FF9F40' },
  { id: 'rent', name: 'Rent', icon: Home, color: '#C9CBCF' },
  { id: 'health', name: 'Health', icon: HeartPulse, color: '#EF4444' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: '#8B5CF6' },
];
   