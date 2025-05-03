import type { InternalAxiosRequestConfig } from 'axios';
import { token } from '../token';

export function attachAuthorizationHeader(config: InternalAxiosRequestConfig) {
  if (!config.headers?.Authorization) {
    const jwt = token.get();

    if (jwt) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${jwt}`,
      } as InternalAxiosRequestConfig['headers'];
    }
  }

  return config;
}
