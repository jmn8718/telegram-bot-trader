export interface ExchangesStatus {
  [exchangeName: string]: boolean;
}

export const EXCHANGES_STATUS: ExchangesStatus = {
  kraken: true,
  coinbase: false,
};
