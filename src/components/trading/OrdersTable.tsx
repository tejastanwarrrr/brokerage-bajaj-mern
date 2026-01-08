import React from 'react';
import { useTrading } from '@/context/TradingContext';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
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

const OrdersTable: React.FC = () => {
  const { orders, cancelOrder } = useTrading();

  return (
    <div className="border border-border rounded-lg bg-card">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Orders ({orders.length})</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Style</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-sm">{order.id}</TableCell>
              <TableCell className="font-medium">{order.symbol}</TableCell>
              <TableCell>
                <span className={cn(
                  'badge-status',
                  order.orderType === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                )}>
                  {order.orderType}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">{order.orderStyle}</TableCell>
              <TableCell className="text-right font-mono">{order.quantity}</TableCell>
              <TableCell className="text-right font-mono">
                {order.price ? `₹${order.price.toFixed(2)}` : 'Market'}
              </TableCell>
              <TableCell>
                <span className={cn(
                  'badge-status',
                  order.status === 'NEW' && 'badge-new',
                  order.status === 'PLACED' && 'badge-placed',
                  order.status === 'EXECUTED' && 'badge-executed',
                  order.status === 'CANCELLED' && 'badge-cancelled'
                )}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {format(new Date(order.createdAt), 'dd MMM HH:mm')}
              </TableCell>
              <TableCell>
                {(order.status === 'NEW' || order.status === 'PLACED') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => cancelOrder(order.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {orders.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">No orders yet.</div>
      )}
    </div>
  );
};

export default OrdersTable;
