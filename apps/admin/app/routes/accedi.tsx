import {
  Input,
  Splash,
  HiddenInput,
  WhiteSheet,
} from '@larapida-websites/shared-ui';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Stack,
  Typography,
} from '@mui/joy';
import { IconEyeClosed, IconEye } from '@tabler/icons-react';
import { useState } from 'react';
import {
  redirect,
  useFetcher,
  useNavigation,
  type MetaFunction,
} from 'react-router';
import { api, token } from '@larapida-websites/shared-client-utils';
import type { Route } from './+types/accedi';

export const meta: MetaFunction = () => [
  {
    title: 'Accedi | La Rapida Molinetto Admin',
  },
];

export function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const next = searchParams.get('next');

  return {
    next: next ? decodeURIComponent(next) : '/',
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const email = (payload.email as string | undefined)?.trim();
  const password = (payload.password as string | undefined)?.trim();
  const next = (payload.next as string | undefined) || '/';

  const missingFields: string[] = [];
  if (!email) missingFields.push('email');
  if (!password) missingFields.push('password');

  if (missingFields.length > 0) {
    return { error: true, fields: missingFields };
  }

  const { data } = await api.v1.post('/auth/login', payload);

  const { token: authToken, error, message } = data;

  if (authToken) {
    token.set(authToken);
    return redirect(next);
  }

  token.remove();
  return { error: error ?? true, message: message ?? 'Login fallito' };
}

export default function AccediComponent({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const { next } = loaderData;

  const fetcher = useFetcher();
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === '/accedi';

  const [showPassword, setShowPassword] = useState(false);

  // errors
  const emailError = actionData?.fields?.includes('email') ?? false;
  const passwordError = actionData?.fields?.includes('password') ?? false;
  const formError = actionData?.error && actionData?.message;

  return (
    <Splash withWallpaper>
      <WhiteSheet variant="solid" sx={{ p: 2 }}>
        <fetcher.Form method="post">
          <Stack direction="column" spacing={2}>
            <HiddenInput name="next" value={next} />

            <FormControl error={emailError}>
              <FormLabel>Email</FormLabel>
              <Input
                required
                name="email"
                autoComplete="email"
                variant="outlined"
                size="md"
                placeholder="La tua email"
                color={emailError ? 'danger' : 'neutral'}
              />
              {emailError && (
                <FormHelperText>Email obbligatoria</FormHelperText>
              )}
            </FormControl>

            <FormControl error={passwordError}>
              <FormLabel>Password</FormLabel>

              <Input
                required
                name="password"
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                size="md"
                placeholder="La tua password"
                color={passwordError ? 'danger' : 'neutral'}
                endDecorator={
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? 'Nascondi password' : 'Mostra password'
                    }
                  >
                    {showPassword ? <IconEyeClosed /> : <IconEye />}
                  </IconButton>
                }
              />
              {passwordError && (
                <FormHelperText>Password obbligatoria</FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              variant="solid"
              color="primary"
              size="md"
              loading={isSubmitting}
            >
              Accedi
            </Button>
          </Stack>
        </fetcher.Form>
        {formError ? (
          <Typography color={actionData.error ? 'danger' : 'success'}>
            {actionData.message}
          </Typography>
        ) : null}
      </WhiteSheet>
    </Splash>
  );
}
