import { config } from '@dotenvx/dotenvx';
import { app, HttpError } from '@larapida-websites/shared-service-utils';
import { Request, Response, NextFunction } from 'express';
import { endpoints } from '@larapida-websites/api-service-endpoints';
import { notFoundMiddleware } from '@larapida-websites/api-service-middlewares';
import { prisma } from './prisma';

config();

app({
  beforeStart(app) {
    // inject Prisma ORM into request
    app.use(prisma);

    // Mount endpoints
    app.use('/:version', endpoints);

    // 404
    app.use(notFoundMiddleware);

    // HttpError handler middleware
    app.use(
      (err: unknown, _req: Request, res: Response, next: NextFunction) => {
        if (err instanceof HttpError) {
          res.status(err.status).json({ error: err.message });
        } else {
          next(err);
        }
      }
    );
  },
});
