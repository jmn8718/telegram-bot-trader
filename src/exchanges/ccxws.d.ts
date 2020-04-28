declare module 'ccxws' {
  export interface TradeMarket {
    id: string;
    base: string;
    quote: string;
  }

  export interface ExchangeTrade {
    exchange: string;
    base: string;
    quote: string;
    price: string;
    amount: string;
    side: string;
    tradeId: string;
    buyOrderId: string;
    sellOrderId: string;
    unix: number;
  }

  export interface Exchange {
    on(event: string, callback: (trade: ExchangeTrade) => void): void;
    subscribeTrades(market: TradeMarket): void;
  }

  type kraken = Exchange;
}
