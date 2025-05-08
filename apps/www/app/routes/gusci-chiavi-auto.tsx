import { MetaFunction } from 'react-router';
import { Page } from '@larapida-websites/www-ui';

export const meta: MetaFunction = () => {
  return [
    { title: 'Gusci Chiavi Auto | La Rapida Molinetto' },
    { description: 'Cambio guscio in plastica della chiave auto' },
  ];
};

export default function GusciChiaviAuto() {
  return (
    <Page
      title="Gusci Chiavi Auto"
      subtitle="Cambio guscio in plastica della chiave auto"
      hero={{ backgroundImageUrl: '/static/images/wallpapers/gusci.webp' }}
    />
  );
}
