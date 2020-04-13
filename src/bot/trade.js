const get = require('lodash.get')
const { getExchange, getTickers } = require('../crypto')

const formatTicker = ({ exchange, ticker }) => `*${exchange}*: _${ticker}_`
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

  const handleTickers = async function (msg, match) {
    console.log(match)
    const pair = match[1].toUpperCase().trim()
    console.log(pair)
    const tickers = await getTickers(pair)
    console.log(tickers)
    bot.sendMessage(get(msg, 'chat.id'), tickers.map(formatTicker).join('\n'), {
      parse_mode: 'Markdown',
    })
  }

  bot.onText(/\/tickers (.+)/, handleTickers)

  const handleTicker = async function (msg, match) {
    console.log(match)
    const exchangeId = match[1].toUpperCase().trim()
    const pair = match[2].toUpperCase().trim()
    console.log(pair, exchangeId)
    const tickers = await getTickers(pair, exchangeId)
    console.log(tickers)
    bot.sendMessage(get(msg, 'chat.id'), tickers.map(formatTicker).join('\n'), {
      parse_mode: 'Markdown',
    })
  }

  bot.onText(/\/ticker (.+) (.+)/, handleTicker)
}

module.exports = {
  registerTradeCommands,
}
