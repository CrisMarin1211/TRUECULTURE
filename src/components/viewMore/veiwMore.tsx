import { Card, CardContent, CardMedia, Stack, Typography, IconButton, Box } from '@mui/material';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import BuyButton from './buttons/buyButton';
import Review from './reviewComponent/review';
import ShareButton from './buttons/shareButton';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import type { ViewMoreProps } from '../../types/ViewMorType';

const ViewMore = ({ item, onClose }: ViewMoreProps) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#121212',
        color: '#fff',
        overflow: 'hidden',
        borderRadius: 0, // 👈 elimina el redondeado
      }}
    >
      {/* Columna izquierda - Imagen */}
      <Box sx={{ position: 'relative', flex: 1 }}>
        <CardMedia
          component="img"
          image={item.image}
          alt={item.name}
          sx={{ height: '100%', objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', bottom: 16, left: 16 }}>
          <ShareButton />
        </Box>
      </Box>

      {/* Columna derecha - Detalles */}
      <CardContent sx={{ flex: 1, position: 'relative', p: 3 }}>
        {/* Botón cerrar arriba a la derecha */}
        <IconButton
          onClick={onClose} // 👈 cerrar modal
          sx={{ position: 'absolute', top: 16, right: 16, color: '#fff' }}
        >
          <CloseTwoToneIcon />
        </IconButton>

        {/* Nombre */}
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {item.name}
        </Typography>

        {/* Fecha y hora (solo si es un EventItem) */}
        {'date' in item && 'time' in item && (
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <CalendarMonthTwoToneIcon sx={{ color: '#4caf50' }} />
            <Stack>
              <Typography fontWeight={600}>{item.date}</Typography>
              <Typography variant="body2" color="gray">
                {item.time}
              </Typography>
            </Stack>
          </Stack>
        )}

        {/* Ubicación */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LocationOnTwoToneIcon sx={{ color: '#4caf50' }} />
          <Stack>
            <Typography fontWeight={600}>{item.location}</Typography>
            <Typography variant="body2" color="gray">
              {item.address}
            </Typography>
          </Stack>
        </Stack>

        {/* Descripción */}
        <Box mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Descripción
          </Typography>
          <Typography variant="body2">{item.description}</Typography>
        </Box>

        {/* Reseñas */}
        <Box mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Reseñas
          </Typography>
          <Review />
        </Box>

        {/* Botón de compra */}
        <Box sx={{ mt: 3 }}>
          <BuyButton item={item} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ViewMore;
