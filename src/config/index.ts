import get from "lodash.get";

interface IConfig {
  BOT_TOKEN: string;
}

export const CONFIG: IConfig = {
  BOT_TOKEN: get(process.env, "TELEGRAM_BOT_TOKEN", ""),
};
