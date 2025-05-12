import express, { Application, ErrorRequestHandler } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import { startService } from './startService';
import cors from 'cors';
import { createCorsOptions } from '@larapida-websites/shared-service-configs';

export interface AppOptions {
  /**
   * Hook to add routes or middleware before the service starts.
   */
  beforeStart?: (app: Application) => void | Promise<void>;

  /**
   * Hook for startup verification logic. Throws to cancel startup.
   */
  verifyStartup?: (app: Application) => void | Promise<void>;

  /**
   * Hook to run after the service has successfully started.
   */
  afterStart?: (app: Application) => void | Promise<void>;

  /**
   * Custom error handler middleware.
   */
  onError?: ErrorRequestHandler;
}

/**
 * Initializes and starts the Express application.
 * Allows injection of middleware/routes before service starts.
 *
 * @param options - Optional hooks for customization.
 */
export async function app(options?: AppOptions): Promise<void> {
  const service: Application = express();

  // Global service variables
  service.set('SERVICE_NAME', process.env.SERVICE_NAME ?? 'www');
  service.set('DOMAIN_NAME', process.env.DOMAIN_NAME ?? 'localhost');
  service.set('PROTOCOL', process.env.HTTPS === 'true' ? 'https' : 'http');
  service.set('PORT', process.env.PORT);

  service.disable('x-powered-by');

  // Common middleware
  service.use(compression());
  service.use(morgan('tiny'));
  service.use(cors(createCorsOptions(service)));
  service.use(express.json());

  // 🔁 Per-app middleware or routes
  if (options?.beforeStart) {
    await options.beforeStart(service);
  }

  if (options?.verifyStartup) {
    try {
      await options.verifyStartup(service);
    } catch (err) {
      console.error('❌ Startup verification failed:', err);
      process.exit(1);
    }
  }

  // ⚠️ Optional custom error handler
  if (options?.onError) {
    service.use(options.onError);
  }

  // 🚀 Start service
  await startService(service);

  // ✅ After-start hook
  if (options?.afterStart) {
    await options.afterStart(service);
  }
}
