import { cookie } from './defaults';

export function get(name: string) {
  return cookie.get(name);
}
