import { type PropsWithChildren } from 'react';

/**
 * Props for the `Splash` component, a fullscreen layout wrapper.
 */
export interface SplashProps extends PropsWithChildren {
  /**
   * The maximum width of the container (Joy UI `Container` maxWidth prop).
   * @default "sm"
   */
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Whether to show a wallpaper background image.
   * @default false
   */
  withWallpaper?: boolean;

  /**
   * Whether to horizontally center the content inside the container.
   * @default false
   */
  alignContentCenter?: boolean;
}
