import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Header from '@/components/layout/Header';
import PortfolioTable from '@/components/trading/PortfolioTable';

const Portfolio: React.FC = () => {
  return (
    <MainLayout>
      <Header 
        title="Portfolio" 
        subtitle="Your current stock holdings and performance"
      />
      
      <div className="p-6">
        <PortfolioTable />
      </div>
    </MainLayout>
  );
};

export default Portfolio;
