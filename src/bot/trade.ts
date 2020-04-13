import get from 'lodash.get';
import TelegramBot from 'node-telegram-bot-api';

import {
  getExchange,
  getTickers,
  formatTicker,
  Ticker,
  Exchange,
} from '../exchanges';

const MESSAGE_OPTIONS: TelegramBot.SendMessageOptions = {
  parse_mode: 'Markdown', // eslint-disable-line
};

export const registerTradeCommands = function (bot: TelegramBot): void {
  const tradeList = async function (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ): Promise<void> {
    const exchange: string = match ? match[1] : '';
    const market: string = match ? match[2] : '';
    let message: string;
    try {
      const exchangeData: Exchange = await getExchange(exchange);
      const exchangeSymbols = exchangeData.symbols.filter(
        (symbol: string) =>
          symbol.toUpperCase().includes(market.toUpperCase()) &&
          symbol.includes('/')
      );
      console.log(exchangeSymbols);
      message =
        exchangeSymbols.length > 0
          ? exchangeSymbols.join('\n')
          : `No trading available for *${market.toUpperCase()}* on _${exchange}_`;
    } catch (err) {
      message = `*${exchange}* is not available on the bot.`;
    }
    bot.sendMessage(get(msg, 'chat.id'), message, MESSAGE_OPTIONS);
  };

  bot.onText(/\/trade list (.+) (.+)/, tradeList);

  const handleTickers = async function (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ): Promise<void> {
    const pair: string = match ? match[1] : '';
    const tickers: Ticker[] = await getTickers(pair);
    const message: string =
      tickers.length > 0
        ? tickers.map(formatTicker).join('\n')
        : `No tickers available for *${pair.toUpperCase()}*`;
    bot.sendMessage(get(msg, 'chat.id'), message, MESSAGE_OPTIONS);
  };

  bot.onText(/\/tickers (.+)/, handleTickers);

  const handleTicker = async function (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ): Promise<void> {
    const exchangeId: string = match ? match[1] : '';
    const pair: string = match ? match[2] : '';
    const tickers: Ticker[] = await getTickers(pair, exchangeId);
    const message: string =
      tickers.length > 0
        ? tickers.map(formatTicker).join('\n')
        : `No tickers available for *${pair.toUpperCase()}* on _${exchangeId}_`;
    bot.sendMessage(get(msg, 'chat.id'), message, MESSAGE_OPTIONS);
  };

  bot.onText(/\/ticker (.+) (.+)/, handleTicker);
};
