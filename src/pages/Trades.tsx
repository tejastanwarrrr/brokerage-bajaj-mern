import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Header from '@/components/layout/Header';
import TradesTable from '@/components/trading/TradesTable';

const Trades: React.FC = () => {
  return (
    <MainLayout>
      <Header 
        title="Trades" 
        subtitle="View your executed trade history"
      />
      
      <div className="p-6">
        <TradesTable />
      </div>
    </MainLayout>
  );
};

export default Trades;
