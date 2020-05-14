import { EXCHANGES_STATUS } from './constants';
import { initializeExchange } from '../exchanges';

export const initializeModules = async function (): Promise<void> {
  try {
    // TODO initialize crypto modules
    for (const [exchange, status] of Object.entries(EXCHANGES_STATUS)) {
      console.log(exchange, status);
      if (status) {
        await initializeExchange(exchange);
      }
    }
  } catch (err) {
    console.log(err);
  }
  return;
};
