import { EventEmitter } from 'events';

export const TRADE_EVENT_TYPES = {
  TRADE: 'TRADE',
};

export const TradeEmitter = new EventEmitter();

export enum TradeSide {
  BUY = 'buy',
  SELL = 'sell',
}

export interface Trade {
  exchange: string;
  symbol: string;
  price: string;
  amount: string;
  side: TradeSide;
  timestamp: number;
}

export const generateEventKey = function (
  eventName: string,
  exchange: string,
  symbol: string
): string {
  return `${eventName.toUpperCase()}_${exchange.toUpperCase()}|${symbol.toUpperCase()}`;
};

export const publishTrade = function (trade: Trade): void {
  const eventKey: string = generateEventKey(
    TRADE_EVENT_TYPES.TRADE,
    trade.exchange,
    trade.symbol
  );
  TradeEmitter.emit(eventKey, trade);
};

export const simulateTrades = function (
  exchange: string,
  symbol: string
): void {
  setInterval(() => {
    const trade: Trade = {
      timestamp: Date.now(),
      exchange,
      symbol,
      price: '120.0',
      amount: '0.01',
      side: TradeSide.BUY,
    };
    publishTrade(trade);
  }, 2000);
};
