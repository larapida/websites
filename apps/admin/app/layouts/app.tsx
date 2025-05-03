import { Outlet, redirect } from 'react-router';
import { api } from '@larapida-websites/shared-client-utils';

export async function clientLoader() {
  // set login url with next search param if necessary
  const currentPath = window.location.pathname + window.location.search;
  const basePath = window.location.pathname;
  const shouldSetNextParam = !['/', '/accedi'].includes(basePath);
  const loginUrl = new URL('/accedi', window.location.origin);
  if (shouldSetNextParam) loginUrl.searchParams.set('next', currentPath);

  // Create a redirect to login page if current basePath isn't the actual login page route
  const redirectAction = () => {
    if (basePath === '/accedi') return null;

    return redirect(loginUrl.pathname + loginUrl.search);
  };

  try {
    const { data } = await api.v1.get('/auth/token/verify-decode', {
      withCredentials: true,
    });
    const { id, isAdmin } = data;

    // checks if the decoded token payload is valid
    const isValid =
      typeof id === 'string' && id.trim().length > 0 && isAdmin === true;

    if (!isValid) {
      return redirectAction();
    }

    return { user: { id, isAdmin } };
  } catch (error) {
    console.error('Token verification failed:', error);
    return redirectAction();
  }
}

export default function AppLayout() {
  return <Outlet />;
}
