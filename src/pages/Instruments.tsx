import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Header from '@/components/layout/Header';
import InstrumentsTable from '@/components/trading/InstrumentsTable';
import OrderForm from '@/components/trading/OrderForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Instruments: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  return (
    <MainLayout>
      <Header 
        title="Instruments" 
        subtitle="Browse and trade available financial instruments"
      />
      
      <div className="p-6">
        <InstrumentsTable onSelectInstrument={setSelectedSymbol} />
      </div>

      <Dialog open={!!selectedSymbol} onOpenChange={() => setSelectedSymbol(null)}>
        <DialogContent className="sm:max-w-md bg-card border-border p-0 overflow-hidden">
          {selectedSymbol && (
            <OrderForm 
              defaultSymbol={selectedSymbol} 
              onOrderPlaced={() => setSelectedSymbol(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Instruments;
