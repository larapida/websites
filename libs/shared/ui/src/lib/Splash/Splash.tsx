import { Box, Container } from '@mui/joy';
import { type SxProps } from '@mui/joy/styles/types';
import { type SplashProps } from './Splash.types';

/**
 * `Splash` is a fullscreen layout component that centers its children,
 * optionally displays a background wallpaper, and constrains the inner width
 * using a Joy UI `Container`.
 *
 * Useful for loading screens, authentication pages, or any page with
 * a focused central layout.
 *
 * @example
 * ```tsx
 * <Splash withWallpaper alignContentCenter>
 *   <Typography level="h2">Welcome</Typography>
 *   <LoginForm />
 * </Splash>
 * ```
 *
 * @param props - Layout configuration including `withWallpaper`, `containerMaxWidth`, and `alignContentCenter`.
 * @returns A styled fullscreen layout container.
 */
export const Splash = (props: SplashProps) => {
  const {
    containerMaxWidth = 'sm',
    withWallpaper = false,
    alignContentCenter = false,
    children,
  } = props;

  const baseSx: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const wallpaperSx: SxProps = withWallpaper
    ? {
        backgroundImage: 'url(/static/images/wallpapers/riparazioni.webp)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }
    : {};

  return (
    <Box sx={{ ...baseSx, ...wallpaperSx }}>
      <Container
        maxWidth={containerMaxWidth}
        sx={{ textAlign: alignContentCenter ? 'center' : 'start' }}
      >
        {children}
      </Container>
    </Box>
  );
};
