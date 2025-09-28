import { Button } from '@mui/material';
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
      endIcon={<ArrowForwardIcon />}
      sx={{
        backgroundColor: theme.palette.blue.main,
        color: '#fff',
        textTransform: 'none',
        borderRadius: '20px',
        padding: '6px 16px',
        fontWeight: 600,
        fontSize: '0.9rem',
        '&:hover': {
          backgroundColor: '#1565c0',
        },
      }}
    >
      ${item.price} Comprar
    </Button>
  );
};

export default BuyButton;
