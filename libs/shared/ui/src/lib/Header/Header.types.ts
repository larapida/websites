import { ReactNode } from 'react';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}
