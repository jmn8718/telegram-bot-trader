import { Server } from '@hapi/hapi';
import hapiAuthJwt from 'hapi-auth-jwt2';

import { API_CONFIG } from '../../config';

interface Users {
  [userId: string]: string;
}

const users: Users = {
  1: 'test@test.com',
};

interface ValidateResult {
  isValid: boolean;
  // credentials?: any;
}
const validate = async function (decoded: any): Promise<ValidateResult> {
  // do your checks to see if the person is valid
  if (!users[decoded.id]) {
    return { isValid: false };
  } else {
    return { isValid: true };
  }
};

export const registerAuth = async function (server: Server): Promise<void> {
  await server.register(hapiAuthJwt);

  server.auth.strategy('jwt', 'jwt', {
    key: API_CONFIG.SECRET,
    validate,
  });

  // add auth to all routes
  // server.auth.default('jwt');
};
