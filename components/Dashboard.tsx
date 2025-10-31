
import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import SummaryCard from './SummaryCard';
import TransactionList from './TransactionList';
import { ArrowUpCircle, ArrowDownCircle, Scale, Search, Calendar, Tag } from 'lucide-react';
import CategoryPieChart from './CategoryPieChart';
import MonthlyBarChart from './MonthlyBarChart';

interface DashboardProps {
  summary: {
    income: number;
    expenses: number;
    balance: number;
  };
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ summary, transactions, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        if (filterType !== 'all' && t.type !== filterType) {
          return false;
        }
        if (filterCategory !== 'all' && t.category !== filterCategory) {
          return false;
        }
        if (searchTerm && !t.notes.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchTerm, filterType, filterCategory]);

  const uniqueCategories = useMemo(() => {
    return [...new Set(transactions.map(t => t.category))];
  }, [transactions]);

  const exportToCSV = () => {
    const headers = "ID,Type,Amount,Category,Date,Notes\n";
    const csvContent = filteredTransactions.map(t => 
      `${t.id},${t.type},${t.amount},${t.category},${t.date},"${t.notes.replace(/"/g, '""')}"`
    ).join("\n");
    
    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "transactions.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" amount={summary.balance} icon={Scale} color="blue" />
        <SummaryCard title="Total Income" amount={summary.income} icon={ArrowUpCircle} color="green" />
        <SummaryCard title="Total Expenses" amount={summary.expenses} icon={ArrowDownCircle} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Expense by Category</h3>
            <CategoryPieChart transactions={transactions} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Monthly Overview</h3>
            <MonthlyBarChart transactions={transactions} />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
             <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-end">
            <button onClick={exportToCSV} className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-hover transition-colors">
                Export to CSV
            </button>
        </div>
      </div>
      
      <TransactionList 
        transactions={filteredTransactions} 
        onEdit={onEdit} 
        onDelete={onDelete} 
      />
    </div>
  );
};

export default Dashboard;
   