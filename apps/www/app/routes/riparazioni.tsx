import { MetaFunction } from 'react-router';
import { Page } from '@larapida-websites/www-ui';

export const meta: MetaFunction = () => {
  return [
    { title: 'Riparazioni | La Rapida Molinetto' },
    {
      description:
        'Riparazioni calzature e pelletteria da viaggio come borse e altro',
    },
  ];
};

export default function Riparazioni() {
  return (
    <Page
      title="Riparazioni"
      subtitle="Riparazioni calzature e pelletteria da viaggio come borse e altro"
    />
  );
}
