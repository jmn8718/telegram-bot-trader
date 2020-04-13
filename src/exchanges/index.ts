import ccxt from "ccxt";
import get from "lodash.get";
import set from "lodash.set";

export interface ITicker {
  exchange: string;
  ticker: number;
}
export interface IExchange extends ccxt.Exchange {}

interface IExchanges<T> {
  [key: string]: T;
}
// https://github.com/ccxt/ccxt/wiki/Manual#unified-api
const exchanges: IExchanges<IExchange> = {};

export const getExchangeTicker = async function (
  exchangeId: string,
  pair: string
): Promise<number> {
  const exchange: IExchange = await getExchange(exchangeId);
  const ticker: ccxt.Ticker = await exchange.fetchTicker(pair);
  return get(ticker, "last", get(ticker, "close", 0));
};

export const getTickers = async function (
  pair: string,
  exchangeId?: string
): Promise<ITicker[]> {
  return Promise.all(
    (exchangeId ? [exchangeId] : Object.keys(exchanges)).map(
      async (exchange: string) => ({
        exchange,
        ticker: await getExchangeTicker(exchange, pair),
      })
    )
  );
};

export const getExchange = function (exchangeId = ""): IExchange {
  const exchange: IExchange = get(exchanges, exchangeId.toUpperCase().trim());
  if (!exchange) {
    throw new Error(`Exchange ${exchangeId} is not initialized`);
  }
  return exchange;
};

export const initializeExchange = async function (
  exchangeId: string = ""
): Promise<void> {
  const exchange: IExchange = new ccxt[exchangeId]();
  await exchange.loadMarkets();
  set(exchanges, exchangeId.toUpperCase(), exchange);
};

export const formatTicker = (tickerData: ITicker): string =>
  `*${tickerData.exchange}*: _${tickerData.ticker}_`;
