import telegramBot from 'node-telegram-bot-api';
import get from 'lodash.get';

import { registerTradeCommands } from './trade';
import { registerEcoCommands } from './eco';
import { registerRegisterCommands } from './register';

import { CONFIG } from '../config';

export const initializeBot = function (): void {
  const bot = new telegramBot(CONFIG.BOT_TOKEN, { polling: true });

  registerTradeCommands(bot);
  registerEcoCommands(bot);
  registerRegisterCommands(bot);

  bot.on('message', (msg) => {
    const chatId = get(msg, 'chat.id');
    const entities = get(msg, 'entities', []);

    if (entities.length > 0) {
      if (get(entities[0], 'type', '') === 'bot_command') {
        // return bot.sendMessage(
        //   chatId,
        //   `Command ${get(msg, 'text', '').split(' ')[0]} not defined`
        // )
        return;
      }
    }
    bot.sendMessage(chatId, 'Received your message');
  });
};
