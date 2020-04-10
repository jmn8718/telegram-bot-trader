require('dotenv').config()

const telegramBot = require('node-telegram-bot-api')
const get = require('lodash.get')

const { registerTradeCommands } = require('./trade')
const { registerEcoCommands } = require('./eco')

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new telegramBot(token, { polling: true })

registerTradeCommands(bot)
registerEcoCommands(bot)

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = get(msg, 'chat.id')
  const entities = get(msg, 'entities', [])

  if (entities.length > 0) {
    if (get(entities[0], 'type', '') === 'bot_command') {
      return bot.sendMessage(
        chatId,
        `Command ${get(msg, 'text', '').split(' ')[0]} not defined`
      )
    }
  }
  bot.sendMessage(chatId, 'Received your message')
})
