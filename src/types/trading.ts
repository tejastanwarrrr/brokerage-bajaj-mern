export interface Instrument {
  id: string;
  symbol: string;
  exchange: 'NSE' | 'BSE';
  instrumentType: 'EQUITY' | 'FUTURES' | 'OPTIONS';
  lastTradedPrice: number;
  change: number;
  changePercent: number;
}

export type OrderType = 'BUY' | 'SELL';
export type OrderStyle = 'MARKET' | 'LIMIT';
export type OrderStatus = 'NEW' | 'PLACED' | 'EXECUTED' | 'CANCELLED';

export interface Order {
  id: string;
  symbol: string;
  exchange: string;
  orderType: OrderType;
  orderStyle: OrderStyle;
  quantity: number;
  price: number | null;
  status: OrderStatus;
  createdAt: string;
  executedAt?: string;
}

export interface Trade {
  id: string;
  orderId: string;
  symbol: string;
  exchange: string;
  tradeType: OrderType;
  quantity: number;
  price: number;
  value: number;
  executedAt: string;
}

export interface PortfolioHolding {
  id: string;
  symbol: string;
  exchange: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
}

export interface PlaceOrderRequest {
  symbol: string;
  exchange: string;
  orderType: OrderType;
  orderStyle: OrderStyle;
  quantity: number;
  price?: number;
}
