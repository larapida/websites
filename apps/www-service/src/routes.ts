import express, { Application } from 'express';
import { join } from 'path';
import { reactRouterServerLoader } from '@larapida-websites/shared-service-utils';

export async function routes(app: Application, root: string) {
  app.use(
    '/assets',
    express.static(join(root, 'client/assets'), {
      immutable: true,
      maxAge: '1y',
    })
  );
  app.use(
    '/static',
    express.static(join(root, 'client/static'), {
      immutable: true,
      maxAge: '1y',
    })
  );
  app.use(express.static(join(root, 'client'), { maxAge: '1h' }));

  /** server-side client loader */
  reactRouterServerLoader(join(root, 'server/index.js'), app);
}
