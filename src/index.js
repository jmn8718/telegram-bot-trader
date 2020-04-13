require('dotenv').config()

const { initializeBot } = require('./bot')

const { initializeExchange } = require('./crypto')

initializeBot()
initializeExchange('kraken')
initializeExchange('coinbasepro')
