import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import { attachAuthorizationHeader } from './authorization-header.interceptor';

const PROTOCOL = import.meta.env.VITE_HTTPS === 'true' ? 'https' : 'http';
const API_SERVICE = import.meta.env.VITE_API_SERVICE_NAME ?? 'api';

/**
 * Configuration object for different API versions.
 */
interface ApiConfig {
  [version: string]: AxiosRequestConfig;
}

type ApiCommonConfig = Omit<AxiosRequestConfig, 'baseURL'>;

const commonApiConfig: ApiCommonConfig = {
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

/**
 * Defines the base URLs, timeouts, and headers for different API versions.
 *
 * @remarks
 * This object should be extended to include all supported API versions.
 * Ensure that any authorization tokens or other sensitive headers are managed securely.
 */
const apiConfig: ApiConfig = {
  v1: {
    ...commonApiConfig,
    baseURL: `${PROTOCOL}://${API_SERVICE}.${import.meta.env.VITE_DOMAIN_NAME}`,
  },
};

/**
 * Helper object providing pre-configured Axios instances for different API versions.
 *
 * @example
 * ```typescript
 * import { api } from '@larapida/shared-clients-utils';
 *
 * // Make a GET request to /data using the v1 API
 * api.v1.get('/data')
 * .then(response => {
 * console.log(response.data);
 * })
 * .catch(error => {
 * console.error(error);
 * });
 *
 * // Make a POST request to /items using the v2 API
 * api.v2.post('/items', { name: 'Item Name' })
 * .then(response => {
 * console.log(response.data);
 * })
 * .catch(error => {
 * console.error(error);
 * });
 * ```
 *
 * @returns An object where each property is an AxiosInstance corresponding to an API version (e.g., `v1`, `v2`, etc.).
 */
export const api: { [version: string]: AxiosInstance } = {};

for (const version in apiConfig) {
  api[version] = axios.create(apiConfig[version]);

  // Attach the token
  api[version].interceptors.request.use(
    (config: InternalAxiosRequestConfig) => attachAuthorizationHeader(config),
    (error) => Promise.reject(error)
  );
}
