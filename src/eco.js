const get = require('lodash.get')

const registerEcoCommands = function (bot) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const handleEcho = (msg, match) => {
    bot.sendMessage(get(msg, 'chat.id'), match[1])
  }
  bot.onText(/\/echo (.+)/, handleEcho)
}

module.exports = {
  registerEcoCommands,
}
