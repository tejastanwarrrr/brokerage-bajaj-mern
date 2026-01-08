import { Instrument, Order, Trade, PortfolioHolding } from '@/types/trading';

export const mockInstruments: Instrument[] = [
  { id: '1', symbol: 'RELIANCE', exchange: 'NSE', instrumentType: 'EQUITY', lastTradedPrice: 2456.75, change: 23.50, changePercent: 0.97 },
  { id: '2', symbol: 'TCS', exchange: 'NSE', instrumentType: 'EQUITY', lastTradedPrice: 3789.20, change: -15.30, changePercent: -0.40 },
  { id: '3', symbol: 'INFY', exchange: 'NSE', instrumentType: 'EQUITY', lastTradedPrice: 1456.80, change: 8.45, changePercent: 0.58 },
  { id: '4', symbol: 'HDFC', exchange: 'NSE', instrumentType: 'EQUITY', lastTradedPrice: 1678.90, change: -5.20, changePercent: -0.31 },
  { id: '5', symbol: 'ICICI', exchange: 'NSE', instrumentType: 'EQUITY', lastTradedPrice: 987.45, change: 12.30, changePercent: 1.26 },
  { id: '6', symbol: 'WIPRO', exchange: 'NSE', instrumentType: 'EQUITY', lastTradedPrice: 456.30, change: -2.15, changePercent: -0.47 },
  { id: '7', symbol: 'BAJAJ', exchange: 'BSE', instrumentType: 'EQUITY', lastTradedPrice: 7234.50, change: 45.80, changePercent: 0.64 },
  { id: '8', symbol: 'SBIN', exchange: 'NSE', instrumentType: 'EQUITY', lastTradedPrice: 612.85, change: 8.90, changePercent: 1.47 },
  { id: '9', symbol: 'TATAMOTORS', exchange: 'NSE', instrumentType: 'EQUITY', lastTradedPrice: 789.60, change: -12.40, changePercent: -1.55 },
  { id: '10', symbol: 'MARUTI', exchange: 'NSE', instrumentType: 'EQUITY', lastTradedPrice: 10234.00, change: 156.00, changePercent: 1.55 },
];

export const mockOrders: Order[] = [
  { id: 'ORD001', symbol: 'RELIANCE', exchange: 'NSE', orderType: 'BUY', orderStyle: 'MARKET', quantity: 10, price: null, status: 'EXECUTED', createdAt: '2024-01-15T09:30:00Z', executedAt: '2024-01-15T09:30:02Z' },
  { id: 'ORD002', symbol: 'TCS', exchange: 'NSE', orderType: 'BUY', orderStyle: 'LIMIT', quantity: 5, price: 3780.00, status: 'PLACED', createdAt: '2024-01-15T10:15:00Z' },
  { id: 'ORD003', symbol: 'INFY', exchange: 'NSE', orderType: 'SELL', orderStyle: 'MARKET', quantity: 15, price: null, status: 'EXECUTED', createdAt: '2024-01-15T11:00:00Z', executedAt: '2024-01-15T11:00:01Z' },
  { id: 'ORD004', symbol: 'HDFC', exchange: 'NSE', orderType: 'BUY', orderStyle: 'LIMIT', quantity: 20, price: 1650.00, status: 'NEW', createdAt: '2024-01-15T11:30:00Z' },
  { id: 'ORD005', symbol: 'ICICI', exchange: 'NSE', orderType: 'SELL', orderStyle: 'LIMIT', quantity: 25, price: 1000.00, status: 'CANCELLED', createdAt: '2024-01-15T12:00:00Z' },
];

export const mockTrades: Trade[] = [
  { id: 'TRD001', orderId: 'ORD001', symbol: 'RELIANCE', exchange: 'NSE', tradeType: 'BUY', quantity: 10, price: 2456.75, value: 24567.50, executedAt: '2024-01-15T09:30:02Z' },
  { id: 'TRD002', orderId: 'ORD003', symbol: 'INFY', exchange: 'NSE', tradeType: 'SELL', quantity: 15, price: 1456.80, value: 21852.00, executedAt: '2024-01-15T11:00:01Z' },
  { id: 'TRD003', orderId: 'ORD006', symbol: 'SBIN', exchange: 'NSE', tradeType: 'BUY', quantity: 50, price: 608.50, value: 30425.00, executedAt: '2024-01-14T14:20:00Z' },
  { id: 'TRD004', orderId: 'ORD007', symbol: 'WIPRO', exchange: 'NSE', tradeType: 'SELL', quantity: 30, price: 458.20, value: 13746.00, executedAt: '2024-01-14T15:45:00Z' },
];

export const mockPortfolio: PortfolioHolding[] = [
  { id: 'PF001', symbol: 'RELIANCE', exchange: 'NSE', quantity: 25, averagePrice: 2400.00, currentPrice: 2456.75, currentValue: 61418.75, pnl: 1418.75, pnlPercent: 2.36 },
  { id: 'PF002', symbol: 'TCS', exchange: 'NSE', quantity: 15, averagePrice: 3850.00, currentPrice: 3789.20, currentValue: 56838.00, pnl: -912.00, pnlPercent: -1.58 },
  { id: 'PF003', symbol: 'ICICI', exchange: 'NSE', quantity: 50, averagePrice: 950.00, currentPrice: 987.45, currentValue: 49372.50, pnl: 1872.50, pnlPercent: 3.94 },
  { id: 'PF004', symbol: 'SBIN', exchange: 'NSE', quantity: 100, averagePrice: 590.00, currentPrice: 612.85, currentValue: 61285.00, pnl: 2285.00, pnlPercent: 3.87 },
  { id: 'PF005', symbol: 'MARUTI', exchange: 'NSE', quantity: 5, averagePrice: 9800.00, currentPrice: 10234.00, currentValue: 51170.00, pnl: 2170.00, pnlPercent: 4.43 },
];

export const generateOrderId = (): string => {
  return `ORD${String(Date.now()).slice(-6)}`;
};

export const generateTradeId = (): string => {
  return `TRD${String(Date.now()).slice(-6)}`;
};
