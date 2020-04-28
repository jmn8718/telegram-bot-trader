import ccxws from 'ccxws';
import { publishTrade, Trade, TradeSide } from '../events/trade';

interface Market {
  exchange: string;
  symbol: string;
  id: string;
  quote: string;
  base: string;
}

interface Exchanges {
  [exchange: string]: ccxws.Exchange;
}

interface Markets {
  [exchangeSymbol: string]: number;
}

export class LiveExchanges {
  exchanges: Exchanges = {};
  markets: Markets = {};

  notify(exchangeTrade: ccxws.ExchangeTrade): void {
    if (
      exchangeTrade.side !== TradeSide.BUY &&
      exchangeTrade.side !== TradeSide.SELL
    ) {
      throw new Error(`Invalid side: ${exchangeTrade.side}`);
    }
    const trade: Trade = {
      exchange: exchangeTrade.exchange,
      symbol: `${exchangeTrade.base}/${exchangeTrade.quote}`.toUpperCase(),
      side:
        exchangeTrade.side === TradeSide.BUY ? TradeSide.BUY : TradeSide.SELL,
      timestamp: exchangeTrade.unix,
      price: exchangeTrade.price,
      amount: exchangeTrade.amount,
    };
    publishTrade(trade);
  }

  register(market: Market): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (!ccxws[market.exchange]) {
      throw new Error(`Exchange: '${market.exchange}' is not available`);
    }

    // get exchange from local
    if (!this.exchanges[market.exchange]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.exchanges[market.exchange] = new ccxws[market.exchange]();
    }
    const exchange = this.exchanges[market.exchange];

    // register for trades if not already listening
    const symbolKey = `${market.exchange}|${market.symbol}`;
    if (!this.markets[symbolKey]) {
      console.log(`REGISTER => ${symbolKey}`);
      exchange.on('trade', this.notify);
      const tradeMarket: ccxws.TradeMarket = {
        id: market.id,
        base: market.base,
        quote: market.quote,
      };
      exchange.subscribeTrades(tradeMarket);
      this.markets[symbolKey] = 1;
    } else {
      console.log(`ALREADY REGISTER => ${symbolKey}`);
    }
  }
}
