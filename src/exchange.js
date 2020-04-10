const ccxt = require('ccxt')
const get = require('lodash.get')
const set = require('lodash.set')

// https://github.com/ccxt/ccxt/wiki/Manual#unified-api

const exchanges = {}

const getExchange = async function (exchangeId) {
  const exchange = get(exchanges, exchangeId)
  if (!exchange) {
    throw new Error(`Exchange ${exchangeId} is not initialized`)
  }
  return exchange
}

const initializeExchange = async function (exchangeId) {
  const exchange = new ccxt[exchangeId]()
  await exchange.loadMarkets()
  set(exchanges, exchangeId, exchange)
}

module.exports = {
  initializeExchange,
  getExchange,
}
