import { Router } from 'express';
import { authEndpoints } from './auth';

export const endpoints: Router = Router({ mergeParams: true });

endpoints.use('/auth', authEndpoints);
