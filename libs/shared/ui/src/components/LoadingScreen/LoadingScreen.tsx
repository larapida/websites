import {
  Splash as SplashLayout,
  type SplashProps as SplashLayoutProps,
} from '../Splash';
import {
  CircularProgress as Spinner,
  type CircularProgressProps as SpinnerProps,
} from '@mui/joy';

export type LoadingScreenProps = {
  /**
   * Props for customizing the internal slots of the LoadingScreen component.
   */
  slotProps?: {
    /**
     * Props forwarded to the `Splash` layout wrapper.
     * Common overrides include `containerMaxWidth` and `alignContentCenter`.
     */
    splash?: SplashLayoutProps;

    /**
     * Props forwarded to the `CircularProgress` spinner.
     * Use to customize size, color, thickness, etc.
     */
    spinner?: SpinnerProps;
  };
};

/**
 * `LoadingScreen` displays a fullscreen loading spinner centered within a `Splash` layout.
 *
 * It is useful for displaying a loading state during route transitions,
 * asynchronous data fetching, or deferred rendering scenarios.
 *
 * Accepts slot props for both the layout container (`splash`) and spinner (`spinner`)
 * to allow full customization of behavior, layout, and style.
 *
 * @example
 * ```tsx
 * <LoadingScreen
 *   slotProps={{
 *     splash: { containerMaxWidth: 'md', alignContentCenter: true },
 *     spinner: { size: 'lg', color: 'primary' },
 *   }}
 * />
 * ```
 *
 * @param props - Slot props for customizing Splash layout and CircularProgress spinner.
 * @returns A responsive, customizable loading UI.
 */
export function LoadingScreen({ slotProps = {} }: LoadingScreenProps) {
  const {
    splash: {
      containerMaxWidth = 'sm',
      alignContentCenter = true,
      ...splashRest
    } = {},
    spinner = {},
  } = slotProps;

  return (
    <SplashLayout
      containerMaxWidth={containerMaxWidth}
      alignContentCenter={alignContentCenter}
      {...splashRest}
    >
      <Spinner {...spinner} />
    </SplashLayout>
  );
}
