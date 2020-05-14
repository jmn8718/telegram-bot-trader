import Hapi from '@hapi/hapi';
import { applyRoutes as exchangeRoutes } from './exchange';

export const applyRoutes = function (server: Hapi.Server): void {
  const API_PATH = '/api';

  exchangeRoutes(server, API_PATH);

  server.route({
    method: '*',
    path: '/{any*}',
    handler: function (_request, h) {
      return h.response({ message: 'not found' }).code(404);
    },
  });
};
