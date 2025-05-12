import { Sheet, Typography } from '@mui/joy';
import type { HeaderProps } from './Header.types';

export const Header = ({ title, subtitle, children }: HeaderProps) => {
  return (
    <Sheet sx={{ my: 6 }}>
      <Typography level="h1" sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography level="h3" sx={{ textAlign: 'center' }} gutterBottom>
          {subtitle}
        </Typography>
      )}
    </Sheet>
  );
};
