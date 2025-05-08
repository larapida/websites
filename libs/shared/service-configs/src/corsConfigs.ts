import { CorsOptions } from 'cors';
import { allowedOrigins } from './allowedOrigins';

/**
 * CORS configuration object used to control origin access and headers.
 */
export const corsConfigs: CorsOptions = {
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
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
};
