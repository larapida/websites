import type { PropsWithChildren } from 'react';

export interface HeaderProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}
