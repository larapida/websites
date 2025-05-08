import { MetaFunction } from 'react-router';
import { Page } from '@larapida-websites/www-ui';

export const meta: MetaFunction = () => {
  return [
    { title: 'Duplicazione Chiavi | La Rapida Molinetto' },
    { description: 'Duplicazione chiavi domestiche anche di sicurezza' },
  ];
};

export default function Chiavi() {
  return (
    <Page
      title="Duplicazione Chiavi"
      subtitle="Duplicazione chiavi domestiche anche di sicurezza"
      hero={{ backgroundImageUrl: '/static/images/wallpapers/chiavi.webp' }}
    />
  );
}
