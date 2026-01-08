import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { mockInstruments } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface InstrumentsTableProps {
  onSelectInstrument?: (symbol: string) => void;
}

const InstrumentsTable: React.FC<InstrumentsTableProps> = ({ onSelectInstrument }) => {
  const [search, setSearch] = useState('');

  const filteredInstruments = mockInstruments.filter((inst) =>
    inst.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="border border-border rounded-lg bg-card">
      {/* Search */}
      <div className="p-4 border-b border-border">
        <Input
          placeholder="Search instruments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Exchange</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">LTP (₹)</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInstruments.map((instrument) => {
            const isPositive = instrument.change >= 0;
            return (
              <TableRow key={instrument.id}>
                <TableCell className="font-medium">{instrument.symbol}</TableCell>
                <TableCell>
                  <span className="badge-status bg-secondary text-secondary-foreground">
                    {instrument.exchange}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{instrument.instrumentType}</TableCell>
                <TableCell className="text-right font-mono">
                  ₹{instrument.lastTradedPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 text-profit" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-loss" />
                    )}
                    <span className={cn('text-sm', isPositive ? 'profit-text' : 'loss-text')}>
                      {isPositive ? '+' : ''}{instrument.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button 
                      size="sm" 
                      className="order-buy h-7 text-xs"
                      onClick={() => onSelectInstrument?.(instrument.symbol)}
                    >
                      BUY
                    </Button>
                    <Button 
                      size="sm" 
                      className="order-sell h-7 text-xs"
                      onClick={() => onSelectInstrument?.(instrument.symbol)}
                    >
                      SELL
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default InstrumentsTable;
