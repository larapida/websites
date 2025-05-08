import { RequestHandler, Router } from 'express';
import { versionMiddleware } from '@larapida-websites/api-service-middlewares';

/**
 * Registers versioned route handlers on a router, ordered by descending version.
 * Assumes handlers are shaped like: { 'login.v1': handlerFn, 'login.v2': handlerFn }
 *
 * @param router - Express Router
 * @param method - HTTP method to register (e.g., 'get', 'post')
 * @param path - Route path (e.g., '/')
 * @param handlers - Record of versioned handlers
 */
export function registerVersionedRoutes(
  router: Router,
  method: 'get' | 'post' | 'put' | 'delete',
  path: string,
  handlers: Record<string, unknown>
) {
  const entries = Object.entries(handlers)
    .map(([name, handler]) => {
      const match = name.match(/\.v(\d+)$/);
      if (!match) return null;
      return {
        version: parseInt(match[1], 10),
        handler: handler as RequestHandler,
      };
    })
    .filter(
      (v): v is { version: number; handler: RequestHandler } => v !== null
    )
    .sort((a, b) => b.version - a.version); // Descending order

  for (const { version, handler } of entries) {
    router[method](path, versionMiddleware(version), handler);
  }
}
