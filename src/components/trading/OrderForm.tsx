import React, { useState } from 'react';
import { useTrading } from '@/context/TradingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockInstruments } from '@/data/mockData';
import { OrderType, OrderStyle } from '@/types/trading';
import { cn } from '@/lib/utils';

interface OrderFormProps {
  defaultSymbol?: string;
  onOrderPlaced?: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ defaultSymbol, onOrderPlaced }) => {
  const { placeOrder } = useTrading();
  const [orderType, setOrderType] = useState<OrderType>('BUY');
  const [orderStyle, setOrderStyle] = useState<OrderStyle>('MARKET');
  const [symbol, setSymbol] = useState(defaultSymbol || '');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedInstrument = mockInstruments.find(i => i.symbol === symbol);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!symbol) newErrors.symbol = 'Required';
    const qty = parseInt(quantity);
    if (!quantity || isNaN(qty) || qty <= 0) newErrors.quantity = 'Must be > 0';
    if (orderStyle === 'LIMIT') {
      const priceNum = parseFloat(price);
      if (!price || isNaN(priceNum) || priceNum <= 0) newErrors.price = 'Required for limit orders';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const instrument = mockInstruments.find(i => i.symbol === symbol);
    if (!instrument) return;

    placeOrder({
      symbol,
      exchange: instrument.exchange,
      orderType,
      orderStyle,
      quantity: parseInt(quantity),
      price: orderStyle === 'LIMIT' ? parseFloat(price) : undefined,
    });

    setQuantity('');
    setPrice('');
    setErrors({});
    onOrderPlaced?.();
  };

  return (
    <div className="border border-border rounded-lg bg-card p-4">
      <h3 className="font-semibold mb-4">Place Order</h3>
      
      {/* Order Type Toggle */}
      <div className="flex gap-2 mb-4">
        <Button
          type="button"
          variant={orderType === 'BUY' ? 'default' : 'outline'}
          className={cn('flex-1', orderType === 'BUY' && 'order-buy')}
          onClick={() => setOrderType('BUY')}
        >
          BUY
        </Button>
        <Button
          type="button"
          variant={orderType === 'SELL' ? 'default' : 'outline'}
          className={cn('flex-1', orderType === 'SELL' && 'order-sell')}
          onClick={() => setOrderType('SELL')}
        >
          SELL
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Instrument</Label>
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {mockInstruments.map((inst) => (
                <SelectItem key={inst.id} value={inst.symbol}>
                  {inst.symbol} - ₹{inst.lastTradedPrice.toFixed(2)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.symbol && <p className="text-xs text-destructive mt-1">{errors.symbol}</p>}
        </div>

        {selectedInstrument && (
          <div className="p-3 bg-muted rounded text-sm">
            <span className="text-muted-foreground">LTP: </span>
            <span className="font-mono font-medium">₹{selectedInstrument.lastTradedPrice.toFixed(2)}</span>
          </div>
        )}

        <div>
          <Label>Order Type</Label>
          <div className="flex gap-2 mt-1">
            <Button
              type="button"
              variant={orderStyle === 'MARKET' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOrderStyle('MARKET')}
            >
              Market
            </Button>
            <Button
              type="button"
              variant={orderStyle === 'LIMIT' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOrderStyle('LIMIT')}
            >
              Limit
            </Button>
          </div>
        </div>

        <div>
          <Label>Quantity</Label>
          <Input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
          {errors.quantity && <p className="text-xs text-destructive mt-1">{errors.quantity}</p>}
        </div>

        {orderStyle === 'LIMIT' && (
          <div>
            <Label>Price (₹)</Label>
            <Input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.05"
            />
            {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
          </div>
        )}

        <Button 
          type="submit" 
          className={cn('w-full', orderType === 'BUY' ? 'order-buy' : 'order-sell')}
        >
          Place {orderType} Order
        </Button>
      </form>
    </div>
  );
};

export default OrderForm;
