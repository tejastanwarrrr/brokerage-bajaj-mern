import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Order, Trade, PlaceOrderRequest, OrderStatus } from '@/types/trading';
import { mockOrders, mockTrades, generateOrderId, generateTradeId, mockInstruments } from '@/data/mockData';
import { toast } from 'sonner';

interface TradingContextType {
  orders: Order[];
  trades: Trade[];
  placeOrder: (request: PlaceOrderRequest) => Order;
  cancelOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const TradingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [trades, setTrades] = useState<Trade[]>(mockTrades);

  const placeOrder = useCallback((request: PlaceOrderRequest): Order => {
    const instrument = mockInstruments.find(i => i.symbol === request.symbol);
    const executionPrice = request.orderStyle === 'MARKET' 
      ? (instrument?.lastTradedPrice || request.price || 0)
      : request.price || 0;

    const newOrder: Order = {
      id: generateOrderId(),
      symbol: request.symbol,
      exchange: request.exchange,
      orderType: request.orderType,
      orderStyle: request.orderStyle,
      quantity: request.quantity,
      price: request.orderStyle === 'LIMIT' ? request.price || null : null,
      status: request.orderStyle === 'MARKET' ? 'EXECUTED' : 'PLACED',
      createdAt: new Date().toISOString(),
      executedAt: request.orderStyle === 'MARKET' ? new Date().toISOString() : undefined,
    };

    setOrders(prev => [newOrder, ...prev]);

    // Simulate immediate execution for market orders
    if (request.orderStyle === 'MARKET') {
      const newTrade: Trade = {
        id: generateTradeId(),
        orderId: newOrder.id,
        symbol: request.symbol,
        exchange: request.exchange,
        tradeType: request.orderType,
        quantity: request.quantity,
        price: executionPrice,
        value: request.quantity * executionPrice,
        executedAt: new Date().toISOString(),
      };
      setTrades(prev => [newTrade, ...prev]);
      toast.success(`${request.orderType} order executed for ${request.quantity} ${request.symbol} @ ₹${executionPrice.toFixed(2)}`);
    } else {
      toast.success(`${request.orderType} limit order placed for ${request.quantity} ${request.symbol} @ ₹${request.price?.toFixed(2)}`);
    }

    return newOrder;
  }, []);

  const cancelOrder = useCallback((orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId && (order.status === 'NEW' || order.status === 'PLACED')
        ? { ...order, status: 'CANCELLED' as OrderStatus }
        : order
    ));
    toast.info(`Order ${orderId} cancelled`);
  }, []);

  const getOrderById = useCallback((orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  return (
    <TradingContext.Provider value={{ orders, trades, placeOrder, cancelOrder, getOrderById }}>
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};
