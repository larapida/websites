import { Sheet, type Theme, type SheetProps } from '@mui/joy';

/**
 * `WhiteSheet` is a pre-styled wrapper around Joy UI's `Sheet` component
 * that uses the `background.body` token to ensure a white or light background.
 *
 * This is useful for consistent theming of cards, panels, or section containers
 * where a clean surface color is needed regardless of the outer theme.
 *
 * You can still override all `SheetProps` (e.g., `variant`, `elevation`, etc.),
 * and `sx` will be shallow-merged with the default background color.
 *
 * @example
 * ```tsx
 * <WhiteSheet variant="outlined" sx={{ p: 2, borderRadius: 'md' }}>
 *   <Typography level="h2">White Sheet Content</Typography>
 * </WhiteSheet>
 * ```
 *
 * @param props - All standard `SheetProps`, with optional `sx` styling.
 * @returns A Joy UI `Sheet` component with a default white-like background.
 */
export function WhiteSheet(props: SheetProps) {
  const { children, sx, ...rest } = props;

  return (
    <Sheet
      sx={{
        backgroundColor: 'background.body',
        ...(typeof sx === 'function'
          ? (theme: Theme) => ({ ...sx(theme) })
          : sx),
      }}
      {...rest}
    >
      {children}
    </Sheet>
  );
}
