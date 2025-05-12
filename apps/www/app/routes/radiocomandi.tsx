import type { MetaFunction } from 'react-router';
import { Page } from '@larapida-websites/www-ui';

export const meta: MetaFunction = () => {
  return [
    { title: 'Duplicazione radiocomandi | La Rapida Molinetto' },
    {
      description:
        'Duplicazione radiocomandi per cancelli, basculanti e garage',
    },
  ];
};

export default function Radiocomandi() {
  return (
    <Page
      title="Duplicazione radiocomandi"
      subtitle="Duplicazione radiocomandi per cancelli, basculanti e garage"
      hero={{
        backgroundImageUrl: '/static/images/wallpapers/radiocomandi.webp',
      }}
    />
  );
}
