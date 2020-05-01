require('dotenv').config();

import { LiveExchanges } from './exchanges/live';
import { initializeExchange, getMarket } from './exchanges';
import { TradeSide } from './events/trade';
import { PriceAlarmBot, PriceAlarmBotParameters } from './trading-bot';

const liveExchanges = new LiveExchanges();

async function init(exchange: string, symbol: string, side: TradeSide, price: string): Promise<void> {
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
    const botParameters: PriceAlarmBotParameters = {
      exchange,
      symbol: symbol.toUpperCase(),
      side,
      price,
    };
    const bot = new PriceAlarmBot(botParameters);
    bot.start();
  } catch (err) {
    console.log(`ERROR: ${exchange} - ${symbol}: ${err.message}`);
  }
}

init('kraken', 'btc/eur', TradeSide.BUY, '7957.00');
init('kraken', 'btc/eur', TradeSide.SELL, '7958.00');
// init('kraken', 'bch/eur');
// init('kraken', 'eth/eur');
