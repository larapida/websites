import {
  AspectRatio,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardOverflow,
  Typography,
} from '@mui/joy';
import { useNavigate } from 'react-router';
import type { MediaCardProps } from './CardMedia.types';

export const CardMedia = ({
  title,
  shortDescription,
  wallpaper,
  action,
  disabled = false,
  disableStretch = false,
}: MediaCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{ width: '100%', height: disableStretch ? 'initial' : '100%' }}
    >
      <CardOverflow>
        <AspectRatio ratio="2">
          <img src={wallpaper} alt="wallpaper" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{title}</Typography>
        {shortDescription && (
          <Typography level="body-sm">{shortDescription}</Typography>
        )}
      </CardContent>
      {!disabled && action && (
        <CardActions buttonFlex="1">
          <ButtonGroup
            variant="outlined"
            sx={{ bgcolor: 'background.surface' }}
          >
            <Button onClick={() => navigate(action)}>Scopri di più</Button>
          </ButtonGroup>
        </CardActions>
      )}
    </Card>
  );
};
