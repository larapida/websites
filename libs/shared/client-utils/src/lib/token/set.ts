import { cookie } from '../cookie';

export function set(token: string): void {
  cookie.set('TOKEN', token);
}
