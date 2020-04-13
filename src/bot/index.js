const telegramBot = require('node-telegram-bot-api')
const get = require('lodash.get')

const { registerTradeCommands } = require('./trade')
const { registerEcoCommands } = require('./eco')

const { BOT_TOKEN } = require('../config')

const initializeBot = function () {
  // Create a bot that uses 'polling' to fetch new updates
  const bot = new telegramBot(BOT_TOKEN, { polling: true })

  registerTradeCommands(bot)
  registerEcoCommands(bot)

  bot.on('message', (msg) => {
    const chatId = get(msg, 'chat.id')
    const entities = get(msg, 'entities', [])

    if (entities.length > 0) {
      if (get(entities[0], 'type', '') === 'bot_command') {
        // return bot.sendMessage(
        //   chatId,
        //   `Command ${get(msg, 'text', '').split(' ')[0]} not defined`
        // )
        return
      }
    }
    bot.sendMessage(chatId, 'Received your message')
  })
}

module.exports = {
  initializeBot,
}
