import { Router } from 'express';
import { login } from './login';
import { me } from './me';
import { registerVersionedRoutes } from '@larapida-websites/api-service-utils';

export const authEndpoints: Router = Router({ mergeParams: true });

registerVersionedRoutes(authEndpoints, 'post', '/login', login);
registerVersionedRoutes(authEndpoints, 'get', '/me', me);
