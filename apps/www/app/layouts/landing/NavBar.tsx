import { Button, Stack } from '@mui/joy';
import { IconMenu2 } from '@tabler/icons-react';
import { WhiteSheet } from '@larapida-websites/shared-ui';

export function NavBar() {
  return (
    <WhiteSheet>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          m: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Button variant="plain">
          <IconMenu2 />
        </Button>
      </Stack>
    </WhiteSheet>
  );
}
