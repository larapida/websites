import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./routes/_index.tsx'),
  route('/accesori-calzature', './routes/accessori-calzature.tsx'),
  route('/batterie', './routes/batterie.tsx'),
  route('/chiavi-auto', './routes/chiavi-auto.tsx'),
  route('/chiavi', './routes/chiavi.tsx'),
  route('/gusci-chiavi-auto', './routes/gusci-chiavi-auto.tsx'),
  route('/riparazioni', './routes/riparazioni.tsx'),
  route('/radiocomandi', './routes/radiocomandi.tsx'),
  route('/targhe', './routes/targhe.tsx'),
] satisfies RouteConfig;
