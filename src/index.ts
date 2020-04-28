require('dotenv').config();

// import { initializeBot } from './telegram-bot';
import { LiveExchanges } from './exchanges/live';
import { initializeExchange, getMarket } from './exchanges';

// initializeBot();
// initializeExchange('kraken');
// initializeExchange('coinbasepro');

async function init(): Promise<void> {
  await initializeExchange('kraken');
  const market = await getMarket('kraken', 'btc/eur');
  const liveExchanges = new LiveExchanges();

  liveExchanges.register({
    exchange: 'kraken',
    symbol: market.symbol,
    id: market.id,
    base: market.base,
    quote: market.quote,
  });
}

init();