require('dotenv').config();

import { initializeBot } from './telegram-bot';

import { initializeExchange } from './exchanges';

initializeBot();
initializeExchange('kraken');
initializeExchange('coinbasepro');
