
import React, { useState, useEffect } from 'react';
import { Transaction, Category, TransactionType } from '../types';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onUpdateTransaction: (transaction: Transaction) => void;
  existingTransaction: Transaction | null;
  categories: Category[];
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
  onUpdateTransaction,
  existingTransaction,
  categories
}) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (existingTransaction) {
      setType(existingTransaction.type);
      setAmount(String(existingTransaction.amount));
      setCategory(existingTransaction.category);
      setDate(existingTransaction.date);
      setNotes(existingTransaction.notes);
    } else {
      // Reset form
      setType('expense');
      setAmount('');
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
      setNotes('');
    }
  }, [existingTransaction, isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) return;
    
    const transactionData = {
      type,
      amount: parseFloat(amount),
      category,
      date,
      notes,
    };

    if (existingTransaction) {
      onUpdateTransaction({ ...transactionData, id: existingTransaction.id });
    } else {
      onAddTransaction(transactionData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md m-4 animate-fade-in" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-center">{existingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-4 mb-4">
            <button type="button" onClick={() => setType('income')} className={`px-6 py-2 rounded-full font-semibold ${type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Income</button>
            <button type="button" onClick={() => setType('expense')} className={`px-6 py-2 rounded-full font-semibold ${type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Expense</button>
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
            <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 focus:outline-none focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select id="category" value={category} onChange={e => setCategory(e.target.value)} required className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 focus:outline-none focus:ring-primary focus:border-primary">
              <option value="" disabled>Select a category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 focus:outline-none focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
            <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 focus:outline-none focus:ring-primary focus:border-primary"></textarea>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primary-hover">{existingTransaction ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
   