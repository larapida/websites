import { useEffect, useState } from 'react';

export type HiddenInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /**
   * If true, delays rendering of the input until after hydration to avoid
   * mismatches caused by browser autofill extensions.
   *
   * @default true
   */
  deferHydration?: boolean;
};

/**
 * A hydration-safe hidden `<input type="hidden" />` element for use in forms.
 *
 * This component avoids hydration mismatches caused by browser extensions
 * or dynamic data by delaying rendering until after the component has mounted.
 * It also wraps the input in a `<div suppressHydrationWarning>` to suppress hydration errors.
 *
 * Useful for hidden form fields that may contain user tokens, session data, or values
 * that are client-specific.
 *
 * @example
 * ```tsx
 * <HiddenInput name="csrfToken" value="abc123" />
 * ```
 *
 * @param props - Standard HTML input props plus `deferHydration`.
 */
export function HiddenInput({
  deferHydration = true,
  ...props
}: HiddenInputProps) {
  const [mounted, setMounted] = useState(!deferHydration);

  useEffect(() => {
    if (deferHydration) {
      setMounted(true);
    }
  }, [deferHydration]);

  if (!mounted) return null;

  return (
    <div suppressHydrationWarning={true}>
      <input type="hidden" {...props} />
    </div>
  );
}
