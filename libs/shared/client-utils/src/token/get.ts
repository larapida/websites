import { cookie } from '../cookie';

export function get(): string | undefined {
  return cookie.get('TOKEN');
}
