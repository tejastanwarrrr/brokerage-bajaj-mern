import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Header from '@/components/layout/Header';
import OrderForm from '@/components/trading/OrderForm';
import { mockPortfolio } from '@/data/mockData';
import { useTrading } from '@/context/TradingContext';
import { Wallet, TrendingUp, FileText, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { orders, trades } = useTrading();

  const totalValue = mockPortfolio.reduce((sum, h) => sum + h.currentValue, 0);
  const totalPnL = mockPortfolio.reduce((sum, h) => sum + h.pnl, 0);
  const openOrders = orders.filter(o => o.status === 'PLACED' || o.status === 'NEW').length;

  const stats = [
    { label: 'Portfolio Value', value: `₹${totalValue.toLocaleString('en-IN')}`, icon: Wallet },
    { label: "Today's P&L", value: `₹${totalPnL.toLocaleString('en-IN')}`, icon: TrendingUp, isProfit: totalPnL >= 0 },
    { label: 'Open Orders', value: String(openOrders), icon: FileText },
    { label: "Today's Trades", value: String(trades.length), icon: BarChart3 },
  ];

  return (
    <MainLayout>
      <Header title="Dashboard" subtitle="Trading overview" />
      
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={cn(
                    'text-xl font-semibold font-mono mt-1',
                    stat.isProfit !== undefined && (stat.isProfit ? 'profit-text' : 'loss-text')
                  )}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Order */}
        <div className="max-w-md">
          <OrderForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
