import get from 'lodash.get';

interface Config {
  BOT_TOKEN: string;
}

export const CONFIG: Config = {
  BOT_TOKEN: get(process.env, 'TELEGRAM_BOT_TOKEN', ''),
};

interface APIConfig {
  HOST: string;
  PORT: number;
  SECRET: string;
}

const port: string = get(process.env, 'PORT', '5000');

export const API_CONFIG: APIConfig = {
  HOST: get(process.env, 'HOST', 'localhost'),
  PORT: parseInt(port, 10),
  SECRET: get(process.env, 'SECRET', 'S3CR3T'),
};
