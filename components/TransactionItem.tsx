
import React from 'react';
import { Transaction } from '../types';
import { CATEGORIES } from '../constants';
import { Edit, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onEdit, onDelete }) => {
  const category = CATEGORIES.find(c => c.id === transaction.category);
  const Icon = category?.icon || (transaction.type === 'income' ? ArrowUpCircle : ArrowDownCircle);

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(transaction.amount);

  const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="p-3 rounded-full mr-4" style={{ backgroundColor: category?.color ? `${category.color}20` : '#80808020', color: category?.color || '#808080' }}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="font-semibold">{category?.name || 'Uncategorized'}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.notes}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell text-gray-500 dark:text-gray-400">
        {formattedDate}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-right font-semibold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
        {transaction.type === 'income' ? `+${formattedAmount}` : `-${formattedAmount}`}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button onClick={() => onEdit(transaction)} className="text-gray-500 hover:text-primary p-2" aria-label="Edit">
          <Edit className="h-5 w-5" />
        </button>
        <button onClick={() => onDelete(transaction.id)} className="text-gray-500 hover:text-danger p-2 ml-2" aria-label="Delete">
          <Trash2 className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};

export default TransactionItem;
   