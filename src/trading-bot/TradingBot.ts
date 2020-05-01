import {
  TradeEmitter,
  TRADE_EVENT_TYPES,
  Trade,
  generateEventKey,
} from '../events/trade';

export interface TradingBotParameters {
  exchange: string;
  symbol: string;
}

export class TradingBot {
  exchange: string;
  symbol: string;
  eventKey: string;

  constructor(parameters: TradingBotParameters) {
    this.exchange = parameters.exchange;
    this.symbol = parameters.symbol;
    this.eventKey = generateEventKey(
      TRADE_EVENT_TYPES.TRADE,
      parameters.exchange,
      parameters.symbol
    );
  }

  handleTrade(trade: Trade): void {
    console.log(
      `TRADE: ${trade.exchange} - ${trade.symbol}: ${trade.side} => ${trade.price} ${trade.amount}`
    );
  }

  start(): void {
    TradeEmitter.on(this.eventKey, this.handleTrade.bind(this));
  }

  stop(): void {
    console.log(`stop => ${this.eventKey}`);
    TradeEmitter.off(this.eventKey, this.handleTrade.bind(this));
  }
}
