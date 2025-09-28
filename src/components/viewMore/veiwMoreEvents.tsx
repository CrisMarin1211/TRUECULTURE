import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import BuyButton from './buttons/buyButton';
import Review from './reviewComponent/review';
import ShareButton from './buttons/shareButton';
import type { ViewMoreProps } from '../../types/ViewMorType';

const veiwMoreEvents = ({ item }: ViewMoreProps) => {
  return (
    <Card>
      <CardContent>
        {/* Botón de cerrar */}
        <CloseTwoToneIcon />

        <Stack>
          <CardMedia component="img" image={item.image} alt={item.name} />
          <ShareButton />
        </Stack>

        <Stack>
          <Typography variant="h5">{item.name}</Typography>

          {/* Ubicación */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOnTwoToneIcon />
            <Stack>
              <Typography>{item.location}</Typography>
              <Typography>{item.address}</Typography>
            </Stack>
          </Stack>

          {/* Descripción */}
          <Stack>
            <Typography variant="h6">Descripción</Typography>
            <Typography>{item.description}</Typography>
          </Stack>

          {/* Reseñas */}
          <Stack>
            <Typography variant="h6">Reseñas</Typography>
            <Review />
          </Stack>

          {/* Botón de compra */}
          <BuyButton />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default veiwMoreEvents;
