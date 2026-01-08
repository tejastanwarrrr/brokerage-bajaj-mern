import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

const marketIndices: MarketIndex[] = [
  { name: 'NIFTY 50', value: 22147.90, change: 156.45, changePercent: 0.71 },
  { name: 'SENSEX', value: 73327.94, change: 498.52, changePercent: 0.68 },
  { name: 'BANK NIFTY', value: 46523.10, change: -124.30, changePercent: -0.27 },
  { name: 'NIFTY IT', value: 35892.45, change: 287.60, changePercent: 0.81 },
];

const MarketOverview: React.FC = () => {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Market Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        {marketIndices.map((index) => {
          const isPositive = index.change >= 0;
          return (
            <div 
              key={index.name} 
              className="p-4 rounded-lg bg-background/50 border border-border/50 transition-all hover:border-primary/30"
            >
              <p className="text-sm text-muted-foreground mb-1">{index.name}</p>
              <p className="text-xl font-semibold font-mono text-foreground">
                {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-profit" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-loss" />
                )}
                <span className={cn('text-sm font-medium', isPositive ? 'profit-text' : 'loss-text')}>
                  {isPositive ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketOverview;
