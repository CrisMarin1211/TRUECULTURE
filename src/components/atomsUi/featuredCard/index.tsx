import type { ProductItem } from '../../../types/ProductType';
import type { EventItem } from '../../../types/EventType';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import theme from '../../../styles/theme';
import arrow from '../../../../public/icons/arrow.svg';

interface FeaturedCardProps {
  item: ProductItem | EventItem;
}

const StyledCard = styled(Card)({
  width: 385,
  height: 450,
  position: 'relative',
  backgroundColor: theme.palette.darkGray1.main,
  overflow: 'hidden',
  borderRadius: 16,
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.grayMedium.main}`,
});

const Overlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(20, 20, 20, 0.85)',
  zIndex: 1,
});

const ImageWrapper = styled('div')({
  width: '100%',
  height: 450,
  position: 'relative',
  overflow: 'hidden',
  zIndex: 2,
});

const StyledImg = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const OverlayTextContainer = styled('div')({
  position: 'absolute',
  bottom: 200,
  left: 20,
  right: 20,
  zIndex: 3,
  color: theme.palette.white.main,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  whiteSpace: 'normal',
  wordWrap: 'break-word',
});

const StyledCardContent = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  marginBottom: '-10px',
  gap: 4,
  zIndex: 2,
});

const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0 20px 16px 20px',
  color: theme.palette.white.main,
  zIndex: 2,
  position: 'relative',
});

const StyledButton = styled(Button)({
  borderRadius: 999,
  backgroundColor: theme.palette.green.main,
});

const FeaturedCard: React.FC<FeaturedCardProps> = ({ item }) => {
  return (
    <StyledCard>
      <Overlay />
      <ImageWrapper>
        <StyledImg src={item.image} alt={item.name} />
        <OverlayTextContainer>
          <Typography variant="h5" component="div" fontWeight="bold">
            {item.name}
          </Typography>
        </OverlayTextContainer>
      </ImageWrapper>

      <StyledCardContent>
        <Typography variant="subtitle2">Live Event</Typography>
        <Typography variant="subtitle1">$ {item.price}</Typography>
      </StyledCardContent>

      <Footer>
        <StyledButton
          variant="contained"
          endIcon={<img src={arrow} alt="icon" style={{ marginLeft: 8 }} />}
        >
          Ver detalles
        </StyledButton>
      </Footer>
    </StyledCard>
  );
};

export default FeaturedCard;
