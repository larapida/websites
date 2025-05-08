import { Box } from '@mui/joy';
import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '56px 1fr',
        gridColumnGap: '0px',
        gridRowGap: '0px',
        height: '100vh',
      }}
    >
      <Box sx={{ overflowY: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
