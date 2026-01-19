import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  trend: number;
  description: string;
}

export const StatsCard = ({ label, value, trend, description }: StatsCardProps) => {
  const isPositive = trend > 0;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <div className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
          isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
        }`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
};