import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useTrading } from '@/context/TradingContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const RecentActivity: React.FC = () => {
  const { orders } = useTrading();
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {recentOrders.map((order) => (
          <div 
            key={order.id}
            className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 transition-all hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center',
                order.orderType === 'BUY' ? 'bg-profit/10' : 'bg-loss/10'
              )}>
                {order.orderType === 'BUY' ? (
                  <ArrowUpRight className="w-4 h-4 text-profit" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-loss" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{order.symbol}</p>
                <p className="text-xs text-muted-foreground">
                  {order.orderType} • {order.orderStyle} • {order.quantity} qty
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={cn(
                'badge-status',
                order.status === 'NEW' && 'badge-new',
                order.status === 'PLACED' && 'badge-placed',
                order.status === 'EXECUTED' && 'badge-executed',
                order.status === 'CANCELLED' && 'badge-cancelled'
              )}>
                {order.status}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(order.createdAt), 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
