import type { ProductItem } from '../../../types/ProductType';
import type { EventItem } from '../../../types/EventType';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import theme from '../../../styles/theme';
import Arror from '../../../../public/icons/arrow.svg';

interface ClientCardProps {
  item: ProductItem | EventItem;
}

const StyledCard = styled(Card)({
  width: '485px',
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
  height: '260px',
  objectFit: 'cover',
});

const StyledCardContent = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const Info = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
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

const CardClient: React.FC<ClientCardProps> = ({ item }) => {
  return (
    <StyledCard>
      <StyledImg src={item.image} alt={item.name} />
      <StyledCardContent>
        <Info>
          <Typography variant="subtitle1">{item.location}</Typography>
          <Typography variant="h6">{item.name}</Typography>
          {'date' in item && item.date && <Typography variant="subtitle2">{item.date}</Typography>}
        </Info>

        <Footer>
          <Typography variant="body2" sx={{ color: theme.palette.white.main }}>
            ${item.price}
          </Typography>
          <CardActions>
            <StyledButton variant="contained">
              Ver detalles
              <img src={Arror} alt="icon" style={{ marginLeft: 8 }} />
            </StyledButton>{' '}
          </CardActions>
        </Footer>
      </StyledCardContent>
    </StyledCard>
  );
};

export default CardClient;
