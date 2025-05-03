import { cookie } from './defaults';

export function set(name: string, value: string) {
  cookie.set(name, value);
}
