const get = require('lodash.get')

const registerTradeCommands = function (bot) {
  const tradeList = (msg, match) => {
    const market = match[1] // the captured "whatever"

    console.log(market)
    bot.sendMessage(get(msg, 'chat.id'), 'TRADE LIST')
  }

  bot.onText(/\/trade list (.+)/, tradeList)
}

module.exports = {
  registerTradeCommands,
}
