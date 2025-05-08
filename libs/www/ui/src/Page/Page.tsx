import React from 'react';
import { Container, Divider, Typography } from '@mui/joy';
import { Header, Hero, type HeroProps } from '@larapida-websites/shared-ui';

export interface PageProps {
  title: string;

  subtitle?: string;

  hero?: HeroProps;

  /**
   * Hide the hero
   * @default false
   */
  hideHero?: boolean;

  children?: React.ReactNode;
}

export const Page = (props: PageProps) => {
  const { title, subtitle, hero, hideHero = false, children } = props;

  return (
    <Container maxWidth="lg">
      <Header title={title} subtitle={subtitle} />

      {!hideHero && <Hero {...hero} />}

      <Divider sx={{ my: 6 }} />

      {children ?? (
        <Typography level="body-md">
          Ancora non ci sono contenuti, riprova a passare tra qualche tempo...
        </Typography>
      )}
    </Container>
  );
};
