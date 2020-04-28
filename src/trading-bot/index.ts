import {
  TradeEmitter,
  TRADE_EVENT_TYPES,
  Trade,
  generateEventKey,
} from '../events/trade';

interface TradingBotParameters {
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
    console.log('handleTrade', trade);
  }

  start(): void {
    console.log(`start => ${this.eventKey}`);
    TradeEmitter.on(this.eventKey, this.handleTrade);
  }

  stop(): void {
    console.log(`stop => ${this.eventKey}`);
    TradeEmitter.off(this.eventKey, this.handleTrade);
  }
}
