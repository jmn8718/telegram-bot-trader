require('dotenv').config();

import { LiveExchanges } from './exchanges/live';
import { initializeExchange, getMarket } from './exchanges';
import { TradingBot, TradingBotParameters } from './trading-bot';

const liveExchanges = new LiveExchanges();

async function init(exchange: string, symbol: string): Promise<void> {
  try {
    await initializeExchange(exchange);
    const market = await getMarket(exchange, symbol);

    liveExchanges.register({
      exchange: exchange,
      symbol: market.symbol,
      id: market.id,
      base: market.base,
      quote: market.quote,
    });
    const botParameters: TradingBotParameters = {
      exchange,
      symbol: symbol.toUpperCase(),
    };
    const bot = new TradingBot(botParameters);
    bot.start();
  } catch (err) {
    console.log(`ERROR: ${exchange} - ${symbol}: ${err.message}`);
  }
}

init('kraken', 'btc/eur');
// init('kraken', 'bch/eur');
// init('kraken', 'eth/eur');
