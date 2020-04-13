import get from 'lodash.get';

interface Config {
  BOT_TOKEN: string;
}

export const CONFIG: Config = {
  BOT_TOKEN: get(process.env, 'TELEGRAM_BOT_TOKEN', ''),
};
