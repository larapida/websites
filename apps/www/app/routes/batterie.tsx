import { MetaFunction } from 'react-router';
import { Page } from '@larapida-websites/www-ui';

export const meta: MetaFunction = () => {
  return [
    { title: 'Batterie per orologi e altro | La Rapida Molinetto' },
    { description: 'Cambio batterie orologi e rivendita di altre batterie' },
  ];
};

export default function Batterie() {
  return (
    <Page
      title="Batterie per orologi e altro"
      subtitle="Cambio batterie orologi e rivendita di altre batterie"
      hero={{
        backgroundImageUrl: '/static/images/wallpapers/orologi.webp',
      }}
    />
  );
}
