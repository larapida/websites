import type { MetaFunction } from 'react-router';
import { Page } from '@larapida-websites/www-ui';

export const meta: MetaFunction = () => {
  return [
    { title: 'Targhe | La Rapida Molinetto' },
    {
      description:
        'Realizzazione di targhe in PVC, plexiglass, ottone e alluminio',
    },
  ];
};

export default function Targhe() {
  return (
    <Page
      title="Targhe"
      subtitle="Realizzazione di targhe in PVC, plexiglass, ottone e alluminio"
      hero={{ backgroundImageUrl: '/static/images/wallpapers/targhe.webp' }}
    />
  );
}
