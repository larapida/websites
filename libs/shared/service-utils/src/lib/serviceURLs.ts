import { Application } from 'express';

/**
 * Constructs the service URLs for localhost and production environments.
 *
 * @param service - The configured Express application.
 * @returns Object with `localhost` and `production` URLs.
 */
export function serviceURLs(service: Application) {
  const SERVICE_NAME = service.get('SERVICE_NAME');
  const DOMAIN_NAME = service.get('DOMAIN_NAME');
  const PROTOCOL = service.get('PROTOCOL');
  const PORT = service.get('PORT');

  // URLs
  const localhost = `http://localhost:${PORT}`;
  const production = `${PROTOCOL}://${
    SERVICE_NAME === 'www' ? '' : `${SERVICE_NAME}.`
  }${DOMAIN_NAME}`;

  return {
    localhost,
    production,
  };
}
