# telegram-bot-trader

Telegram bot for handle crypto trading actions, built with typescript.

## Requirements

- Create a telegram's bot, check the [documention](https://core.telegram.org/bots#3-how-do-i-create-a-bot) to create one.
- nodejs

## Instructions

### Development

For development, this project uses `typescript` and `nodemon` for reload of the file changes.

Run `npm watch` to run the project on development mode.

## Build

Run `npm run build` to build the project from ts to js.
Run `npm run serve` to start the built project.

## References

- [ccxt](https://github.com/ccxt/ccxt)
- [ccxws](https://github.com/altangent/ccxws)
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

- `/register (exchange) (pair)`. Register to get notification of prices updates.
  Example: `/register kraken eth/eur`
  Response:
  ```
  Registed notification for ETH/EUR on kraken
  Current ticker is 140.31
  ```

- `/unregister (exchange) (pair)`. Register to get notification of prices updates.
  Example: `/unregister kraken eth/eur`
  Response:
  ```
  Unregisted notification for ETH/EUR on coinbasepro
  ```

## Live notifications

User's can register to recibe price updates using the command `/register ...`, the bot sends notifications on every hour, it uses a cron scheduler to notify the users. 