import type { PropsWithChildren } from 'react';

export interface HeroProps extends PropsWithChildren {
  /**
   * @default "/images/wallpapers/riparazioni.webp"
   */
  backgroundImageUrl?: string;

  /**
   * @default "35vh"
   */
  height?: string;
}
