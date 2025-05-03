import Cookies from 'js-cookie';

export const cookie: Cookies.CookiesStatic = Cookies.withAttributes({
  path: '/',
  domain: `.${import.meta.env.VITE_DOMAIN_NAME}`,
  expires: 7,
});
