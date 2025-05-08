import { Application } from 'express';
import { serviceURLs } from '../serviceURLs';

/**
 * Starts the Express service and handles lifecycle events.
 *
 * @param service - The configured Express application.
 */
export async function startService(service: Application) {
  const PORT = Number.parseInt(service.get('PORT'));
  const SERVICE_NAME = service.get('SERVICE_NAME');
  const URLs = serviceURLs(service);

  try {
    const server = service.listen(PORT, () => {
      console.log(`🚀 "${SERVICE_NAME}" service running:`);
      console.log(`- Local:      ${URLs.localhost}`);
      console.log(`- Production: ${URLs.production}`);
    });

    const shutdown = () => {
      console.log(`🛑 Shutting down "${SERVICE_NAME}"...`);
      server.close(() => {
        console.log('✅ Service closed.');
        process.exit(0);
      });
    };

    server.on('error', (error: NodeJS.ErrnoException) => {
      console.error('❌ Startup error:', error);
      process.exit(1);
    });

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('❌ Error during service startup:', error);
  }
}
