import { MetaFunction } from 'react-router';
import { Page } from '@larapida-websites/www-ui';

export const meta: MetaFunction = () => {
  return [
    { title: 'Duplicazione Chiavi Auto | La Rapida Molinetto' },
    {
      description:
        'Duplicazione chiavi auto comprese di microchip avviamento motore senza radiocomando',
    },
  ];
};

export default function ChiaviAuto() {
  return (
    <Page
      title="Duplicazione Chiavi Auto"
      subtitle="Duplicazione chiavi auto comprese di microchip avviamento motore senza radiocomando"
      hero={{
        backgroundImageUrl: '/static/images/wallpapers/chiavi-auto.webp',
      }}
    />
  );
}
