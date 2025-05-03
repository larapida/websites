import { cookie } from '../cookie';

export function remove(): void {
  cookie.remove('TOKEN');
}
