import ccxt from 'ccxt';
import get from 'lodash.get';
import set from 'lodash.set';

export interface Ticker {
  exchange: string;
  ticker: number;
}
export type Exchange = ccxt.Exchange;

interface Exchanges<T> {
  [key: string]: T;
}
// https://github.com/ccxt/ccxt/wiki/Manual#unified-api
const exchanges: Exchanges<Exchange> = {};

export const getExchange = function (exchangeId = ''): Exchange {
  const exchange: Exchange = get(exchanges, exchangeId.toUpperCase().trim());
  if (!exchange) {
    throw new Error(`Exchange ${exchangeId} is not initialized`);
  }
  return exchange;
};

export const getExchangeTicker = async function (
  exchangeId: string,
  pair: string
): Promise<number> {
  const exchange: Exchange = await getExchange(exchangeId);
  const ticker: ccxt.Ticker = await exchange.fetchTicker(pair);
  return get(ticker, 'last', get(ticker, 'close', 0));
};

export const getTickers = async function (
  pair: string,
  exchangeId?: string
): Promise<Ticker[]> {
  return Promise.all(
    (exchangeId ? [exchangeId] : Object.keys(exchanges)).map(
      async (exchange: string) => ({
        exchange,
        ticker: await getExchangeTicker(exchange, pair),
      })
    )
  );
};

export const initializeExchange = async function (
  exchangeId: string
): Promise<void> {
  const exchange: Exchange = new ccxt[exchangeId]();
  await exchange.loadMarkets();
  set(exchanges, exchangeId.toUpperCase(), exchange);
};

export const formatTicker = (tickerData: Ticker): string =>
  `*${tickerData.exchange}*: _${tickerData.ticker}_`;
