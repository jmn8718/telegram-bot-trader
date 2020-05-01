import { Trade, TradeSide } from '../events/trade';

import { TradingBot, TradingBotParameters } from './TradingBot';

export interface PriceAlarmBotParameters extends TradingBotParameters {
  price: string;
  side: TradeSide;
}

export class PriceAlarmBot extends TradingBot {
  price: string;
  side: string;
  constructor(parameters: PriceAlarmBotParameters) {
    super(parameters);
    this.price = parameters.price;
    this.side = parameters.side;
  }

  handleTrade(trade: Trade): void {
    console.log(
      `ALARM TRADE: ${trade.side} => ${trade.price} ${trade.amount}`
    );
    if (this.side === TradeSide.SELL) {
      if (trade.price < this.price) {
        this.notify(trade)
      }
    } else {
      if (trade.price > this.price) {
        this.notify(trade)
      }
    }
  }

  notify(trade: Trade): void {
    console.log('PRICE ALERT', trade.price)
  }
}
