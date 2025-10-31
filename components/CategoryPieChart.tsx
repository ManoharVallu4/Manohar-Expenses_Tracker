
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';
import { CATEGORIES } from '../constants';

interface CategoryPieChartProps {
  transactions: Transaction[];
}

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ transactions }) => {
  const data = useMemo(() => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const categoryTotals: { [key: string]: number } = {};

    expenseTransactions.forEach(t => {
      if (categoryTotals[t.category]) {
        categoryTotals[t.category] += t.amount;
      } else {
        categoryTotals[t.category] = t.amount;
      }
    });

    return Object.keys(categoryTotals).map(categoryId => {
      const categoryInfo = CATEGORIES.find(c => c.id === categoryId);
      return {
        name: categoryInfo?.name || 'Uncategorized',
        value: categoryTotals[categoryId],
        color: categoryInfo?.color || '#808080',
      };
    });
  }, [transactions]);

  if (data.length === 0) {
      return <div className="flex items-center justify-center h-64 text-gray-500">No expense data to display.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
   