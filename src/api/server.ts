import Hapi from '@hapi/hapi';

import { API_CONFIG } from '../config';
import { applyRoutes } from './routes';
import { initializeModules } from './modules';

export const initializeServer = async function (): Promise<void> {
  const server = Hapi.server({
    port: API_CONFIG.PORT,
    host: API_CONFIG.HOST,
  });

  applyRoutes(server);
  await initializeModules();

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};
