
import React from 'react';
import { Transaction } from '../types';
import TransactionItem from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold mb-2">No Transactions Found</h3>
        <p className="text-gray-500 dark:text-gray-400">Add a new transaction to get started!</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <h3 className="text-xl font-semibold p-6">Recent Transactions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Details</th>
              <th className="px-6 py-3 hidden md:table-cell">Date</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map(transaction => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
   