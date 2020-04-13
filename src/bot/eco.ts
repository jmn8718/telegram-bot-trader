import get from 'lodash.get';
import TelegramBot from 'node-telegram-bot-api';

export const registerEcoCommands = function (bot: TelegramBot): void {
  const handleEcho = (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ): void => {
    const command: string = match ? match[1] : '';
    bot.sendMessage(get(msg, 'chat.id'), command);
  };

  bot.onText(/\/echo (.+)/, handleEcho);
};

module.exports = {
  registerEcoCommands,
};
