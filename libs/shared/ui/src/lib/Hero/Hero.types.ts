import React from 'react';

export interface HeroProps {
  /**
   * @default "/images/wallpapers/riparazioni.webp"
   */
  backgroundImageUrl?: string;

  /**
   * @default "35vh"
   */
  height?: string;

  children?: React.ReactNode;
}
