const CONFIG = {
  BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
}

if (!CONFIG.BOT_TOKEN) {
  console.error('Provide Telegram Bot token')
  process.exit(1)
}

module.exports = CONFIG
