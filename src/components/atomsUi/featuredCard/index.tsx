import type { ProductItem } from '../../../types/ProductType';
import type { EventItem } from '../../../types/EventType';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import theme from '../../../styles/theme';

interface FeaturedCardProps {
  item: ProductItem | EventItem;
  onViewMore?: (item: EventItem | ProductItem) => void;
}

const StyledCard = styled(Card)({
  width: 385,
  height: 450,
  position: 'relative',
  backgroundColor: theme.palette.darkGray1.main,
  overflow: 'hidden',
  borderRadius: 16,
  border: `1px solid ${theme.palette.grayMedium.main}`,
});

const ImageWrapper = styled('div')({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  zIndex: 0,
});

const StyledImg = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

const Overlay = styled('div')({
  position: 'absolute',
  inset: 0,
  background: theme.palette.black70.main,
  zIndex: 1,
});

const OverlayTextContainer = styled('div')({
  position: 'absolute',
  top: 16,
  left: 16,
  zIndex: 2,
  color: theme.palette.white.main,
});

const BottomContent = styled('div')({
  position: 'absolute',
  left: 20,
  bottom: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
  zIndex: 3,
  color: theme.palette.white.main,
});

const StyledCardContent = styled(CardContent)({
  padding: 0,
  background: 'transparent',
  color: theme.palette.white.main,
});

const StyledButton = styled(Button)({
  borderRadius: 999,
  backgroundColor: theme.palette.green.main,
  color: theme.palette.white.main,
  textTransform: 'none',
});

const FeaturedCard: React.FC<FeaturedCardProps> = ({ item, onViewMore }) => {
  return (
    <StyledCard>
      <Overlay />

      <ImageWrapper>
        <StyledImg src={item.image} alt={item.name} />
      </ImageWrapper>

      <OverlayTextContainer>
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          paddingBlock={4}
          paddingInline={2}
        >
          {item.name}
        </Typography>
      </OverlayTextContainer>

      <BottomContent sx={{ paddingInline: 2 }}>
        <StyledCardContent>
          <Typography variant="subtitle2">Live Event</Typography>
          <Typography variant="subtitle1">$ {item.price}</Typography>
        </StyledCardContent>

        <StyledButton
          variant="contained"
          onClick={() => onViewMore?.(item)}
          endIcon={<img src="/icons/arrow.svg" alt="icon" style={{ marginLeft: 8 }} />}
        >
          Ver detalles
        </StyledButton>
      </BottomContent>
    </StyledCard>
  );
};

export default FeaturedCard;
