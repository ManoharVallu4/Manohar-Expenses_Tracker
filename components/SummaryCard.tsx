
import React from 'react';
import { LucideProps } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ComponentType<LucideProps>;
  color: 'blue' | 'green' | 'red';
}

const colorClasses = {
  blue: 'from-blue-400 to-blue-600',
  green: 'from-green-400 to-green-600',
  red: 'from-red-400 to-red-600',
};

const iconColorClasses = {
  blue: 'text-blue-100',
  green: 'text-green-100',
  red: 'text-red-100',
};

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, icon: Icon, color }) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} text-white p-6 rounded-lg shadow-lg flex items-center justify-between`}>
      <div>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-3xl font-bold">{formattedAmount}</p>
      </div>
      <div className={`p-3 bg-white/20 rounded-full ${iconColorClasses[color]}`}>
        <Icon className="h-8 w-8" />
      </div>
    </div>
  );
};

export default SummaryCard;
   