import { config } from '@dotenvx/dotenvx';
import { resolve } from 'path';
import { app } from '@larapida-websites/shared-service-utils';
import { routes } from './routes';

config();

app({
  beforeStart: async (app) => {
    const root = resolve(__dirname, '../admin');
    const router = await routes(root);
    app.use(router);
  },
});
