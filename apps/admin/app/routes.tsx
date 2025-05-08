import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  route('/accedi', './routes/accedi.tsx'),
  layout('./routes/_protected.tsx', [index('./routes/_protected._index.tsx')]),
] satisfies RouteConfig;
