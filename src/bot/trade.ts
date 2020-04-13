import get from "lodash.get";
import TelegramBot from "node-telegram-bot-api";

import {
  getExchange,
  getTickers,
  formatTicker,
  ITicker,
  IExchange,
} from "../exchanges";

const registerTradeCommands = function (bot: TelegramBot) {
  const tradeList = async function (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ): Promise<void> {
    const market: string = match ? match[1] : "";

    const kraken: IExchange = await getExchange("kraken");
    const symbols = kraken.symbols.filter(
      (symbol: string) =>
        symbol.toUpperCase().includes(market) && symbol.includes("/")
    );
    bot.sendMessage(get(msg, "chat.id"), symbols.join("\n"));
  };

  bot.onText(/\/trade list (.+)/, tradeList);

  const handleTickers = async function (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ): Promise<void> {
    const pair: string = match ? match[1] : "";
    const tickers: ITicker[] = await getTickers(pair);
    bot.sendMessage(get(msg, "chat.id"), tickers.map(formatTicker).join("\n"), {
      parse_mode: "Markdown",
    });
  };

  bot.onText(/\/tickers (.+)/, handleTickers);

  const handleTicker = async function (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ): Promise<void> {
    const exchangeId: string = match ? match[1] : "";
    const pair: string = match ? match[2] : "";
    const tickers: ITicker[] = await getTickers(pair, exchangeId);
    bot.sendMessage(get(msg, "chat.id"), tickers.map(formatTicker).join("\n"), {
      parse_mode: "Markdown",
    });
  };

  bot.onText(/\/ticker (.+) (.+)/, handleTicker);
};

module.exports = {
  registerTradeCommands,
};
