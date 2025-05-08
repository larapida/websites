import { HttpError } from '@larapida-websites/shared-service-utils';
import { NextFunction, Request, Response } from 'express';

/**
 * Express middleware to handle unmatched routes (404 errors).
 *
 * This middleware should be registered **after all other route handlers** to catch requests
 * that don't match any existing endpoints.
 *
 * It passes a `HttpError` with a 404 status to the next error-handling middleware.
 *
 * @example
 * ```ts
 * import express from 'express';
 * import { notFoundMiddleware } from './middlewares/not-found.middleware';
 *
 * const app = express();
 *
 * app.get('/api/hello', (req, res) => {
 *   res.send('Hello');
 * });
 *
 * // Register this after all routes
 * app.use(notFoundMiddleware);
 * ```
 *
 * @param req - Express Request object (unused)
 * @param res - Express Response object (unused)
 * @param next - Express NextFunction to pass the error to the next middleware
 */
export function notFoundMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  next(new HttpError(404, 'Risorsa non trovata'));
}
