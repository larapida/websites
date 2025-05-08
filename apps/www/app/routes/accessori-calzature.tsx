import { MetaFunction } from 'react-router';
import { Page } from '@larapida-websites/www-ui';

export const meta: MetaFunction = () => {
  return [
    { title: 'Accessori calzature | La Rapida Molinetto' },
    {
      description:
        'Rivendita accessori per la cura della scarpa e della piccola pelletteria da viaggio in generale',
    },
  ];
};

export default function AccessoriCalzature() {
  return (
    <Page
      title="Accessori calzature"
      subtitle="Rivendita accessori per la cura della scarpa e della piccola pelletteria da viaggio in generale"
      hero={{
        backgroundImageUrl:
          '/static/images/wallpapers/accessori-calzature.webp',
      }}
    />
  );
}
