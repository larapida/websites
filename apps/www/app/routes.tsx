import {
  type RouteConfig,
  layout,
  index,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./layouts/landing/index.tsx', [
    index('./routes/_index/route.tsx'),
    route('/accesori-calzature', './routes/accessori-calzature/route.tsx'),
    route('/batterie', './routes/batterie/route.tsx'),
    route('/chiavi-auto', './routes/chiavi-auto/route.tsx'),
    route('/chiavi', './routes/chiavi/route.tsx'),
    route('/gusci-chiavi-auto', './routes/gusci-chiavi-auto/route.tsx'),
    route('/riparazioni', './routes/riparazioni/route.tsx'),
    route('/radiocomandi', './routes/radiocomandi/route.tsx'),
    route('/targhe', './routes/targhe/route.tsx'),
  ]),
] satisfies RouteConfig;
