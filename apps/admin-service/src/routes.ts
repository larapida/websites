import express, { Router, Response } from 'express';
import { join } from 'path';

/**
 * Creates a router that serves static client assets.
 *
 * @param root - The root directory of the client build.
 * @returns An Express Router with routes for static files and fallback to index.html.
 *
 * @example
 * ```ts
 * app.use(routes(path.resolve(__dirname, '../public')));
 * ```
 */
export async function routes(root: string): Promise<express.Router> {
  const router = Router();

  router.use('/assets', express.static(join(root, 'client/assets')));

  router.use('/static', express.static(join(root, 'client/static')));

  router.use(express.static(join(root, 'client'), { maxAge: '1h' }));

  router.all('/{*any}', (_req, res: Response) => {
    res.sendFile(join(root, 'client/index.html'));
  });

  return router;
}
