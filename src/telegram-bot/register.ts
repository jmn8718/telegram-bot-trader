import get from 'lodash.get';
import set from 'lodash.set';
import TelegramBot from 'node-telegram-bot-api';
import { CronJob } from 'cron';

import { getTickers, Ticker, formatTicker } from '../exchanges';

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

const unregisterPairToUser = (
  userId: string,
  pair: string,
  exchangeId: string
): void => {
  const pairs: UserUpdateInformation[] = get(registeredUsers, userId, []);
  const indexOfPair = pairs.findIndex(
    (currentPair: UserUpdateInformation) =>
      currentPair.pair === pair && currentPair.exchangeId === exchangeId
  );
  if (indexOfPair > -1) {
    pairs.splice(indexOfPair, 1);
  }
};

const notifyUser = async function (
  bot: TelegramBot,
  userId: string
): Promise<void> {
  const userSubscriptions: UserUpdateInformation[] = get(
    registeredUsers,
    userId,
    []
  );
  if (userSubscriptions.length > 0) {
    const results: Ticker[] = await Promise.all(
      userSubscriptions.map(
        async (subscription: UserUpdateInformation): Promise<Ticker> => {
          const currentTickers: Ticker[] = await getTickers(
            subscription.pair,
            subscription.exchangeId
          );
          return currentTickers[0];
        }
      )
    );
    const message = `_Subscriptions_\n${results.map(formatTicker).join('\n')}`;
    bot.sendMessage(userId, message, MESSAGE_OPTIONS);
  }
};

const initializeCron = function (bot: TelegramBot): void {
  const job = new CronJob('0 0 */1 * * *', () => {
    console.log('Cron job execution started');
    Object.keys(registeredUsers).forEach((userId: string) => {
      notifyUser(bot, userId);
    });
    console.log('Cron job execution done');
  });
  job.start();
  console.log('Cron job started');
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

  const handleUnRegister = async function (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ): Promise<void> {
    const userId: string = get(msg, 'chat.id');
    const exchangeId: string = match ? match[1] : '';
    const pair: string = match ? match[2] : '';
    unregisterPairToUser(userId, pair, exchangeId);
    const message = `Unregisted notification for *${pair.toUpperCase()}* on _${exchangeId}_`;
    bot.sendMessage(get(msg, 'chat.id'), message, MESSAGE_OPTIONS);
  };

  bot.onText(/\/register (.+) (.+)/, handleRegister);
  bot.onText(/\/unregister (.+) (.+)/, handleUnRegister);

  initializeCron(bot);
};
