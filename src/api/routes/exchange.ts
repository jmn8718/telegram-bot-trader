import Hapi from '@hapi/hapi';
import {
  getExchanges,
  getExchangeData,
  getExchangeStatus,
} from '../services/exchanges';
import { ExchangesStatus } from '../constants';

export const applyRoutes = function (
  server: Hapi.Server,
  basePath: string
): void {
  const routesPath = `${basePath}/exchanges`;
  server.route({
    method: 'GET',
    path: routesPath,
    handler: (request, h) => {
      const options: ExchangesStatus = {};
      console.log(request.query);
      if (request.query.status === 'active') {
        options.status = true;
      } else if (request.query.status === 'inactive') {
        options.status = false;
      }
      const result = getExchanges(options);
      return h.response(result);
    },
  });
  server.route({
    method: 'GET',
    path: `${routesPath}/{exchange}`,
    config: { auth: 'jwt' },
    handler: async (request, h) => {
      const { exchange } = request.params;
      const { result, status } = await getExchangeStatus(exchange);
      if (result.message) {
        return h.response(result).code(status);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return h.response(result.symbols);
    },
  });

  server.route({
    method: 'GET',
    path: `${routesPath}/{exchange}/symbols`,
    handler: async (request, h) => {
      const { exchange } = request.params;
      const { result, status } = await getExchangeData(exchange);
      if (result.message) {
        return h.response(result).code(status);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return h.response(result.symbols);
    },
  });
};
