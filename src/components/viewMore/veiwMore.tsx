import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import BuyButton from './buttons/buyButton';
import Review from './reviewComponent/review';
import ShareButton from './buttons/shareButton';
import SeatSelection from '../seatSelection';
import { useState } from 'react';
import type { ViewMoreProps } from '../../types/ViewMorType';
import type { EventItem } from '../../types/EventType';
import theme from '../../styles/theme';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContex';

const ViewMore = ({ item, onClose }: ViewMoreProps) => {
  const [readMore, setReadMore] = useState(false);
  const [seatModalOpen, setSeatModalOpen] = useState(false);
  const toggleReadMore = () => setReadMore(!readMore);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuy = () => {
    const isEvent = 'totalseats' in item;
    const eventItem = isEvent ? (item as EventItem) : null;
    const hasSeating = eventItem?.has_seating ?? false;

    if (isEvent && hasSeating && eventItem && eventItem.totalseats > 0) {
      setSeatModalOpen(true);
    } else {
      addToCart({
        id: item.id ?? '',
        title: item.name ?? '',
        image: item.image,
        price: item.price,
        quantity: 1,
        type: isEvent ? 'event' : 'product',
      });
      navigate('/my-cart');
    }
  };

  const handleSeatConfirm = (seats: string[]) => {
    if (seats.length === 0) return;

    addToCart({
      id: item.id ?? '',
      title: item.name ?? '',
      image: item.image,
      price: item.price,
      quantity: seats.length,
      seats: seats,
      type: 'event',
    });

    setSeatModalOpen(false);
    navigate('/my-cart');
  };

  const isEvent = 'totalseats' in item;
  const eventItem = isEvent ? (item as EventItem) : null;
  const hasSeating = eventItem?.has_seating ?? false;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundColor: '#121212',
        color: '#fff',
        borderRadius: 0,
        height: { xs: '100vh', md: '80vh' },
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          minHeight: { xs: 220, sm: 260, md: 'auto' },
        }}
      >
        <CardMedia
          component="img"
          image={item.image}
          alt={item.name}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ShareButton item={item} />
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CardContent
          sx={{
            height: '100%',
            overflowY: 'auto',
            p: { xs: 2, md: 3 },
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#fff',
              zIndex: 5,
              mb: 2,
            }}
          >
            <CloseTwoToneIcon />
          </IconButton>

          <Typography
            variant="h4"
            sx={{
              mt: { xs: 4, md: 6 },
              fontSize: { xs: '1.5rem', sm: '1.7rem', md: '2rem' },
            }}
            gutterBottom
          >
            {item.name}
          </Typography>

          {'date' in item && 'time' in item && (
            <Stack direction="row" alignItems="center" spacing={2} mb={2} sx={{ mt: 3 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: theme.palette.darkGray1.main,
                  borderRadius: 0.1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CalendarMonthTwoToneIcon sx={{ color: theme.palette.green.main }} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ mb: '-3px', fontSize: { xs: '0.9rem', md: '1rem' } }}
                >
                  {item.date}
                </Typography>
                <Typography
                  variant="body2"
                  color="gray"
                  sx={{ mt: 0, lineHeight: 1, fontSize: { xs: '0.8rem', md: '0.9rem' } }}
                >
                  {item.time}
                </Typography>
              </Box>
            </Stack>
          )}

          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Box
              sx={{
                width: 50,
                height: 50,
                backgroundColor: theme.palette.darkGray1.main,
                borderRadius: 0.1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LocationOnTwoToneIcon sx={{ color: theme.palette.green.main }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="body1" sx={{ mt: 0, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                {item.location}
              </Typography>
              <Typography
                variant="body2"
                color="gray"
                sx={{ mt: 0, lineHeight: 1, fontSize: { xs: '0.8rem', md: '0.9rem' } }}
              >
                {item.address}
              </Typography>
            </Box>
          </Stack>

          <Box mb={2}>
            <Typography fontSize={{ xs: '1rem', md: '1.25rem' }} fontWeight={900}>
              Descripción
            </Typography>
            <Typography
              variant="body2"
              color="white"
              sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}
            >
              {readMore
                ? item.description
                : item.description.slice(0, 150) + (item.description.length > 150 ? '...' : '')}
            </Typography>
            {item.description.length > 150 && (
              <Button
                onClick={toggleReadMore}
                sx={{
                  color: theme.palette.green.main,
                  mt: 1,
                  textTransform: 'none',
                  fontSize: { xs: '0.85rem', md: '0.95rem' },
                }}
              >
                {readMore ? 'Leer menos' : 'Leer más'}
              </Button>
            )}
          </Box>

          <Box mb={10}>
            <Typography fontSize={{ xs: '1rem', md: '1.25rem' }} fontWeight={900}>
              Reseñas
            </Typography>
            <Review relatedId={String(item.id)} relatedType={isEvent ? 'event' : 'product'} />
          </Box>
        </CardContent>

        <Box
          sx={{
            position: 'absolute',
            height: { xs: '40%', md: '60%' },
            width: '100%',
            bottom: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <Box sx={{ pointerEvents: 'auto' }}>
            <BuyButton item={item} onClick={handleBuy} />
          </Box>
        </Box>
      </Box>

      {isEvent && hasSeating && eventItem && (
        <SeatSelection
          open={seatModalOpen}
          onClose={() => setSeatModalOpen(false)}
          onConfirm={handleSeatConfirm}
          eventId={Number(item.id)}
          totalSeats={eventItem.totalseats}
          availableSeats={eventItem.availableseats}
          bookedSeats={[]}
        />
      )}
    </Card>
  );
};

export default ViewMore;
