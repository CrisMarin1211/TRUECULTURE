import type { ProductItem } from '../../../types/ProductType';
import type { EventItem } from '../../../types/EventType';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import theme from '../../../styles/theme';
import Arrow from '../../../../public/icons/arrow.svg';

interface ClientCardProps {
  item: ProductItem | EventItem;
  onViewMore?: (item: EventItem | ProductItem) => void;
}

const StyledCard = styled(Card)({
  width: '385px',
  height: '330px',
  position: 'relative',
  backgroundColor: theme.palette.darkGray1.main,
  overflow: 'hidden',
  borderRadius: 16,
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.grayMedium.main}`,
});

const StyledImg = styled('img')({
  width: '100%',
  height: '180px',
  objectFit: 'cover',
  flexShrink: 0,
});

const StyledCardContent = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '12px 16px',
});

const Info = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  overflow: 'hidden',
});
const Title = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
const Footer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: theme.palette.white.main,
});

const StyledButton = styled(Button)({
  textTransform: 'none',
  borderRadius: 999,
  backgroundColor: theme.palette.green.main,
});

const CardClient: React.FC<ClientCardProps> = ({ item, onViewMore }) => {
  return (
    <StyledCard>
      <StyledImg src={item.image} alt={item.name} />
      <StyledCardContent>
        <Info>
          <Typography variant="subtitle1">{item.location}</Typography>
          <Title variant="h6">{item.name}</Title>
          {'date' in item && item.date && (
            <Typography variant="subtitle2" fontWeight={900}>
              {item.date}
            </Typography>
          )}
        </Info>

        <Footer>
          <Typography variant="body2" color="white" fontWeight={400}>
            ${item.price}
          </Typography>
          {onViewMore && (
            <CardActions>
              <StyledButton variant="contained" onClick={() => onViewMore(item)}>
                Ver detalles
                <img src={Arrow} alt="icon" style={{ marginLeft: 8 }} />
              </StyledButton>
            </CardActions>
          )}
        </Footer>
      </StyledCardContent>
    </StyledCard>
  );
};

export default CardClient;
