import { Button, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { EventItem } from '../../../types/EventType';
import type { ProductItem } from '../../../types/ProductType';
import theme from '../../../styles/theme';

interface BuyButtonProps {
  item: EventItem | ProductItem;
}

const BuyButton = ({ item }: BuyButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // centrar texto e icono horizontalmente
        borderRadius: theme.shape.borderRadius,
        padding: '8px 12px',
        boxShadow: '0px 8px 20px rgba(0,0,0,0.25)',
        width: '250px',
        height: '55px',
        gap: 2,
        backgroundColor: theme.palette.blue.main,
        color: '#fff',
        textTransform: 'none',
        fontWeight: 400,
        fontSize: '1rem',
        '&:hover': {
          backgroundColor: '#1565c0',
        },
      }}
    >
      Comprar ${item.price}{' '}
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '50%',
          width: 30,
          height: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ml: 1,
        }}
      >
        <ArrowForwardIcon sx={{ color: '#000', fontSize: 20 }} />
      </Box>
    </Button>
  );
};

export default BuyButton;
