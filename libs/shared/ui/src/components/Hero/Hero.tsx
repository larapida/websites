import { Sheet } from '@mui/joy';
import { HeroProps } from './Hero.types';

export const Hero = ({
  backgroundImageUrl = '/static/images/wallpapers/riparazioni.webp',
  height = '35vh',
  children,
}: HeroProps) => {
  return (
    <div>
      <Sheet
        sx={{
          backgroundImage: 'url(' + backgroundImageUrl + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: height,
          borderRadius: '16px',
        }}
      >
        {children}
      </Sheet>
    </div>
  );
};
