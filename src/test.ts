import { simulateTrades } from './events/trade';
import { TradingBot } from './trading-bot';

const tradingBot = new TradingBot({ exchange: 'kraken', symbol: 'eth-eur' });
tradingBot.start();

setTimeout(() => {
  tradingBot.stop();
}, 20000);

simulateTrades('kraken', 'eth-eur');
simulateTrades('kraken', 'btc-eur');
