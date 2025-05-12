import { CorsOptions } from 'cors';
import { Application } from 'express';

/**
 * Creates CORS configuration based on the DOMAIN_NAME stored in the app instance.
 */
export function createCorsOptions(app: Application): CorsOptions {
  const domainName = app.get('DOMAIN_NAME') as string;

  if (!domainName) {
    throw new Error('la variabile DOMAIN_NAME non è impostata');
  }

  const domainParts = domainName.split('.');
  const baseDomainPattern = `.${domainParts.slice(-2).join('\\.')}$`;

  const allowedOrigins: (string | RegExp)[] = [
    `http://${domainName}`,
    `https://${domainName}`,
    new RegExp(baseDomainPattern),
  ];

  return {
    origin: (origin: string | undefined, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedOrigins.some(
          (entry) => entry instanceof RegExp && entry.test(origin)
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error('Non permesso dale regole CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  };
}
