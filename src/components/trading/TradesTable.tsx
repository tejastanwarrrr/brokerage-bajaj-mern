import React from 'react';
import { useTrading } from '@/context/TradingContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TradesTable: React.FC = () => {
  const { trades } = useTrading();

  return (
    <div className="border border-border rounded-lg bg-card">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Executed Trades ({trades.length})</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trade ID</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell className="font-mono text-sm">{trade.id}</TableCell>
              <TableCell className="font-medium">{trade.symbol}</TableCell>
              <TableCell>
                <span className={cn(
                  'badge-status',
                  trade.tradeType === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                )}>
                  {trade.tradeType}
                </span>
              </TableCell>
              <TableCell className="text-right font-mono">{trade.quantity}</TableCell>
              <TableCell className="text-right font-mono">₹{trade.price.toFixed(2)}</TableCell>
              <TableCell className="text-right font-mono font-medium">
                ₹{trade.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {format(new Date(trade.executedAt), 'dd MMM HH:mm')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {trades.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">No trades yet.</div>
      )}
    </div>
  );
};

export default TradesTable;
