import { Typography } from '@mui/joy';
import type { Route } from './+types/_protected._index';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  {
    title: 'Dashboard | La Rapida Molinetto Admin',
  },
];

export default function DashboardComponent(_: Route.ComponentProps) {
  return (
    <div>
      <Typography level="h1">Dashboard</Typography>
    </div>
  );
}
