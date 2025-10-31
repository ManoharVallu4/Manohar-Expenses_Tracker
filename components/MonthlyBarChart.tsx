
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';

interface MonthlyBarChartProps {
  transactions: Transaction[];
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ transactions }) => {
    const data = useMemo(() => {
        const monthlyData: { [key: string]: { name: string; income: number; expenses: number } } = {};

        transactions.forEach(t => {
            const month = new Date(t.date).toLocaleString('default', { month: 'short', year: '2-digit' });
            if (!monthlyData[month]) {
                monthlyData[month] = { name: month, income: 0, expenses: 0 };
            }
            if (t.type === 'income') {
                monthlyData[month].income += t.amount;
            } else {
                monthlyData[month].expenses += t.amount;
            }
        });

        // sort data by date
        const sortedData = Object.values(monthlyData).sort((a, b) => {
            const [aMonth, aYear] = a.name.split(' ');
            const [bMonth, bYear] = b.name.split(' ');
            const aDate = new Date(`${aMonth} 1, 20${aYear}`);
            const bDate = new Date(`${bMonth} 1, 20${bYear}`);
            return aDate.getTime() - bDate.getTime();
        });


        return sortedData;
    }, [transactions]);

    if (data.length === 0) {
      return <div className="flex items-center justify-center h-64 text-gray-500">No data to display.</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
                  labelStyle={{ color: '#333' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend />
                <Bar dataKey="income" fill="#22C55E" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MonthlyBarChart;
   