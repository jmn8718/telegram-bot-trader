require('dotenv').config();

import { initializeBot } from './bot';

import { initializeExchange } from './exchanges';

initializeBot();
initializeExchange('kraken');
initializeExchange('coinbasepro');
