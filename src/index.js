require('dotenv').config()
require('./bot')

const { initializeExchange } = require('./exchange')

initializeExchange('kraken')
initializeExchange('coinbasepro')
