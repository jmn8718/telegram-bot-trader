# telegram-bot-trader

Telegram bot for handle crypto trading actions, built with typescript.

## Requirements

- Create a telegram's bot, check the [documention](https://core.telegram.org/bots#3-how-do-i-create-a-bot) to create one.
- nodejs

## Instructions

### Development

For development, this project uses `typescript` and `ts-node-dev` for reload of the file changes.

Run `npm start` to run the project on development mode.

## Build

Run `npm run build` to build the project from ts to js.
Run `npm run serve` to start the built project.

## References

- [ccxt](https://github.com/ccxt/ccxt)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [Telegram bot documentation](https://core.telegram.org/bots)

## Bot commands

- `/echo xxx`, reply to the user whatever they send to the bot.
  Example: `/echo hello there`
  Response: `hello there`

- `/ticket (exchange) (pair)`. Ask for the ticker price of the expecified exchange.
  Example: `/ticker kraken btc/eur`
  Response: 
  ```
  kraken: 6166.3
  ```

- `/tickers (pair)`. Ask for the ticker prices of the registered exchanges on the bot
  Example: `/tickers eth/eur`
  Response:
  ```
  COINBASEPRO: 140.74
  KRAKEN: 140.88
  ```

- `/trade list (exchange) (currency)`. Ask for the ticker prices of the registered exchanges on the bot
  Example: `/trade list kraken eth`
  Response:
  ```
  ADA/ETH
  ALGO/ETH
  ATOM/ETH
  BAT/ETH
  ...
  ```