const get = require('lodash.get')
const { getExchange, getSymbols } = require('./exchange')

const registerTradeCommands = function (bot) {
  const tradeList = async function (msg, match) {
    const market = match[1].toUpperCase().trim()

    console.log(market)
    const kraken = await getExchange('kraken')
    const symbols = kraken.symbols.filter(
      (symbol) => symbol.toUpperCase().includes(market) && symbol.includes('/')
    )
    console.log(symbols)
    bot.sendMessage(get(msg, 'chat.id'), symbols.join('\n'))
  }

  bot.onText(/\/trade list (.+)/, tradeList)

  const fetchTicker = async function (msg, match) {
    const pair = match[1].toUpperCase().trim()
    console.log(pair)
    const kraken = await getExchange('kraken')
    const ticker = await kraken.fetch_ticker(pair)
    console.log(ticker)
    bot.sendMessage(
      get(msg, 'chat.id'),
      get(ticker, 'last', get(ticker, 'close', '-'))
    )
  }

  bot.onText(/\/ticker (.+)/, fetchTicker)
}

module.exports = {
  registerTradeCommands,
}
