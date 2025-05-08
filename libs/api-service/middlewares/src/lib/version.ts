import { NextFunction, Request, Response } from 'express';
import { HttpError } from '@larapida-websites/shared-service-utils';

/**
 * Middleware to route based on API versioning.
 *
 * @param version - The minimum supported API version.
 * @returns Express middleware function that checks the version from `req.params.version`.
 *
 * Example:
 * ```
 * app.get('/api/:version/resource', versionMiddleware(2), handler);
 * ```
 * If the request has `:version` as `v2` or higher (e.g., `v3`), it will proceed.
 * Otherwise, it skips to the next matching route.
 */
export const versionMiddleware = (version: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const rawVersion = req.params.version;

    // Expecting format like "v2", "v3", etc.
    const requestVersion = rawVersion?.startsWith('v')
      ? parseInt(rawVersion.slice(1), 10)
      : NaN;

    // Validate parsed version number
    if (isNaN(requestVersion)) {
      next(new HttpError(400, 'Versione API richiesta non valida'));
    }

    // Proceed if request version is greater than or equal to the required version
    if (requestVersion >= version) {
      next();
    }

    // Skip to next route if version is too low
    next('route');
  };
};
