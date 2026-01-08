import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeLabel, icon: Icon }) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="stat-card animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold text-foreground font-mono">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-profit" />
              ) : (
                <TrendingDown className="w-4 h-4 text-loss" />
              )}
              <span className={cn('text-sm font-medium', isPositive ? 'profit-text' : 'loss-text')}>
                {isPositive ? '+' : ''}{change.toFixed(2)}%
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
