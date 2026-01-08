import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Header from '@/components/layout/Header';
import OrdersTable from '@/components/trading/OrdersTable';

const Orders: React.FC = () => {
  return (
    <MainLayout>
      <Header 
        title="Orders" 
        subtitle="View and manage your trading orders"
      />
      
      <div className="p-6">
        <OrdersTable />
      </div>
    </MainLayout>
  );
};

export default Orders;
