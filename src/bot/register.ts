import get from 'lodash.get';
import set from 'lodash.set';
import TelegramBot from 'node-telegram-bot-api';

import { getTickers, Ticker } from '../exchanges';

const MESSAGE_OPTIONS: TelegramBot.SendMessageOptions = {
  parse_mode: 'Markdown', // eslint-disable-line
};

interface RegisteredUsers<T> {
  [key: string]: T;
}

interface UserUpdateInformation {
  pair: string;
  exchangeId: string;
}
const registeredUsers: RegisteredUsers<UserUpdateInformation[]> = {};

const registerPairToUser = (
  userId: string,
  pair: string,
  exchangeId: string
): void => {
  const pairs: UserUpdateInformation[] = get(registeredUsers, userId, []);
  if (
    pairs.findIndex(
      (currentPair: UserUpdateInformation) =>
        currentPair.pair === pair && currentPair.exchangeId === exchangeId
    ) === -1
  ) {
    pairs.push({ pair, exchangeId });
  }
  set(registeredUsers, userId, pairs);
};

export const registerRegisterCommands = function (bot: TelegramBot): void {
  const handleRegister = async function (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ): Promise<void> {
    const userId: string = get(msg, 'chat.id');
    const exchangeId: string = match ? match[1] : '';
    const pair: string = match ? match[2] : '';
    let message: string;
    try {
      const tickers: Ticker[] = await getTickers(pair, exchangeId);

      if (tickers.length > 0) {
        registerPairToUser(userId, pair, exchangeId);
        message = `
          Registed notification for *${pair.toUpperCase()}* on _${exchangeId}_\n
          Current ticker is *${tickers[0].ticker}*
        `;
      } else {
        message = `No pair available *${pair.toUpperCase()}* on _${exchangeId}_`;
      }
    } catch (err) {
      message = `*${exchangeId}* is not available on the bot.`;
    }
    bot.sendMessage(get(msg, 'chat.id'), message, MESSAGE_OPTIONS);
  };

  bot.onText(/\/register (.+) (.+)/, handleRegister);
};
