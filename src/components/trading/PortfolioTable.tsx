import React from 'react';
import { mockPortfolio } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const PortfolioTable: React.FC = () => {
  const totalInvested = mockPortfolio.reduce((sum, h) => sum + (h.averagePrice * h.quantity), 0);
  const totalCurrent = mockPortfolio.reduce((sum, h) => sum + h.currentValue, 0);
  const totalPnL = totalCurrent - totalInvested;
  const totalPnLPercent = (totalPnL / totalInvested) * 100;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Invested</p>
          <p className="text-xl font-semibold font-mono">
            ₹{totalInvested.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Current Value</p>
          <p className="text-xl font-semibold font-mono">
            ₹{totalCurrent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">P&L</p>
          <p className={cn('text-xl font-semibold font-mono', totalPnL >= 0 ? 'profit-text' : 'loss-text')}>
            {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Returns</p>
          <div className="flex items-center gap-1">
            {totalPnLPercent >= 0 ? (
              <TrendingUp className="w-4 h-4 text-profit" />
            ) : (
              <TrendingDown className="w-4 h-4 text-loss" />
            )}
            <p className={cn('text-xl font-semibold font-mono', totalPnLPercent >= 0 ? 'profit-text' : 'loss-text')}>
              {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="border border-border rounded-lg bg-card">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">Holdings ({mockPortfolio.length})</h3>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Avg Price</TableHead>
              <TableHead className="text-right">LTP</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">P&L</TableHead>
              <TableHead className="text-right">Returns</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPortfolio.map((h) => (
              <TableRow key={h.id}>
                <TableCell className="font-medium">{h.symbol}</TableCell>
                <TableCell className="text-right font-mono">{h.quantity}</TableCell>
                <TableCell className="text-right font-mono">₹{h.averagePrice.toFixed(2)}</TableCell>
                <TableCell className="text-right font-mono">₹{h.currentPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right font-mono">
                  ₹{h.currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-right">
                  <span className={cn('font-mono', h.pnl >= 0 ? 'profit-text' : 'loss-text')}>
                    {h.pnl >= 0 ? '+' : ''}₹{h.pnl.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {h.pnlPercent >= 0 ? (
                      <TrendingUp className="w-3 h-3 text-profit" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-loss" />
                    )}
                    <span className={cn('font-mono text-sm', h.pnlPercent >= 0 ? 'profit-text' : 'loss-text')}>
                      {h.pnlPercent >= 0 ? '+' : ''}{h.pnlPercent.toFixed(2)}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PortfolioTable;
