import has from 'lodash.has';

import { EXCHANGES_STATUS, ExchangesStatus } from '../constants';
import { getExchange, Exchange } from '../../exchanges';

interface GetExchangesOptions {
  status?: boolean;
}

interface NoExchage {
  message: string;
}

interface ExchangeResult {
  result: NoExchage | Exchange;
  status: number;
}

export const getExchanges = function (
  options: GetExchangesOptions
): ExchangesStatus {
  if (!has(options, 'status')) {
    return EXCHANGES_STATUS;
  }
  const result: ExchangesStatus = {};
  for (const [exchange, status] of Object.entries(EXCHANGES_STATUS)) {
    console.log(exchange, status);
    if (status === options.status) {
      result[exchange] = status;
    }
  }
  return result;
};

export const getExchangeStatus = function (exchange: string): ExchangeResult {
  return {
    status: has(EXCHANGES_STATUS, exchange) ? 200 : 404,
    result: {
      message: has(EXCHANGES_STATUS, exchange)
        ? `Exchange ${exchange} is ${
            EXCHANGES_STATUS[exchange] ? 'active' : 'inactive'
          }`
        : `Exchange ${exchange} not available`,
    },
  };
};
export const getExchangeData = async function (
  exchange: string
): Promise<ExchangeResult> {
  if (!EXCHANGES_STATUS[exchange]) {
    return {
      status: has(EXCHANGES_STATUS, exchange) ? 200 : 404,
      result: {
        message: `Exchange ${exchange} not available`,
      },
    };
  }
  const exchangeData = await getExchange(exchange);
  return { result: exchangeData, status: 200 };
};
