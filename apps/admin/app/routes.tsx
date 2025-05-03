import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  route('/accedi', './routes/accedi.tsx'),
  layout('./layouts/app.tsx', [index('./routes/dashboard.tsx')]),
] satisfies RouteConfig;
