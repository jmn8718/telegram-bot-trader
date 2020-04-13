const ccxt = require('ccxt')
const get = require('lodash.get')
const set = require('lodash.set')

// https://github.com/ccxt/ccxt/wiki/Manual#unified-api

const exchanges = {}

const getExchangeTicker = async function (exchangeId, pair) {
  const exchange = await getExchange(exchangeId)
  const ticker = await exchange.fetch_ticker(pair)
  return get(ticker, 'last', get(ticker, 'close', '-'))
}

const getTickers = async function (pair, exchangeId) {
  return Promise.all(
    (exchangeId ? [exchangeId] : Object.keys(exchanges)).map(
      async (exchange) => ({
        exchange,
        ticker: await getExchangeTicker(exchange, pair),
      })
    )
  )
}

const getExchange = async function (exchangeId = '') {
  const exchange = get(exchanges, exchangeId.toUpperCase())
  if (!exchange) {
    throw new Error(`Exchange ${exchangeId} is not initialized`)
  }
  return exchange
}

const initializeExchange = async function (exchangeId = '') {
  const exchange = new ccxt[exchangeId]()
  await exchange.loadMarkets()
  set(exchanges, exchangeId.toUpperCase(), exchange)
}

module.exports = {
  initializeExchange,
  getExchange,
  getExchangeTicker,
  getTickers,
}
