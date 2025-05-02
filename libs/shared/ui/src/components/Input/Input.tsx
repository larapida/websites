import { useState, useEffect } from 'react';
import { type InputProps as JoyInputProps, Input as JoyInput } from '@mui/joy';

export type InputProps = JoyInputProps & {
  /**
   * If true, delays rendering of the input until after hydration to avoid
   * mismatches caused by browser autofill extensions.
   *
   * @default true
   */
  deferHydration?: boolean;
};

/**
 * A Joy UI Input component that suppresses hydration warnings caused by
 * browser autofill extensions (e.g., NordPass, 1Password).
 *
 * It optionally delays rendering until after hydration to prevent DOM mismatches,
 * and always applies `suppressHydrationWarning` to the root element.
 *
 * @param props - All standard Joy UI Input props plus `deferHydration`.
 *
 * @example
 * ```tsx
 * import { Input } from './Input';
 *
 * function LoginForm() {
 *   return (
 *     <form>
 *       <Input
 *         name="email"
 *         type="email"
 *         autoComplete="email"
 *         placeholder="Email address"
 *       />
 *       <Input
 *         name="password"
 *         type="password"
 *         autoComplete="current-password"
 *         placeholder="Password"
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
export function Input({ deferHydration = true, ...props }: InputProps) {
  const [mounted, setMounted] = useState(!deferHydration);

  useEffect(() => {
    if (deferHydration) {
      setMounted(true);
    }
  }, [deferHydration]);

  if (!mounted) return null;

  return (
    <JoyInput
      {...props}
      slotProps={{ root: { suppressHydrationWarning: true } }}
    />
  );
}
