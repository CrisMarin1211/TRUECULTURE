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
  position: 'relative',
  backgroundColor: theme.palette.darkGray1.main,
  overflow: 'hidden',
  borderRadius: 16,
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.grayMedium.main}`,

    width: '100%',
  maxWidth: 385,
  height: 330,

  '@media (max-width: 480px)': {
    maxWidth: 260,
    height: 280,
  },

  '@media (max-width: 360px)': {
    maxWidth: 200,   // no tan extremo
    height: 180,
  },

  '@media (min-width: 481px) and (max-width: 768px)': {
    maxWidth: 300,
    height: 300,
  },
})


const StyledImg = styled('img')({
  width: '100%',
  height: 180,
  objectFit: 'cover',
  flexShrink: 0,

  '@media (max-width: 480px)': {
    height: 140,
  },

  '@media (max-width: 360px)': {
    height: 100,
  },

  '@media (min-width: 481px) and (max-width: 768px)': {
    height: 160,
  },
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
  gap: 5,       
  overflow: 'hidden',
});

const Title = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '1.5rem',

  '@media (max-width: 480px)': {
    fontSize: '0.9rem',
    
  },

  '@media (max-width: 360px)': {
    fontSize: '0.7rem',
  },

  '@media (min-width: 481px) and (max-width: 768px)': {
    fontSize: '1rem',
  },
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
  fontSize: '0.9rem',
  paddingInline: 16,
  paddingBlock: 8,

  '@media (max-width: 480px)': {
    fontSize: '0.75rem',
    paddingInline: 12,
    paddingBlock: 6,
  },
'@media (max-width: 360px)': {
    fontSize: '0.5rem',
    paddingBlock: 2,
  },
  

  '@media (min-width: 481px) and (max-width: 768px)': {
    fontSize: '0.85rem',
    paddingInline: 14,
    paddingBlock: 7,
  },
});


const CardClient: React.FC<ClientCardProps> = ({ item, onViewMore }) => {
  return (
    <StyledCard>
      <StyledImg src={item.image} alt={item.name} />
      <StyledCardContent>
        <Info>
          <Typography
  variant="subtitle1"
  sx={{
    fontSize: '0.95rem',
    lineHeight: 1.1,
    marginBottom: 0,
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
    },

    '@media (max-width: 360px)': {
    fontSize: '0.5rem',
  },

    '@media (min-width: 481px) and (max-width: 768px)': {
      fontSize: '0.9rem',
    },

  }}
>
  {item.location}
</Typography>

<Title
  variant="h6"
  sx={{
    lineHeight: 1.1,
    marginTop: 0,
    marginBottom: 0,
  }}
>
  {item.name}
</Title>

{'date' in item && item.date && (
  <Typography
    variant="subtitle2"
    fontWeight={900}
    sx={{
      fontSize: '0.9rem',
      lineHeight: 1.1,
      marginTop: 0,
      '@media (max-width: 480px)': {
        fontSize: '0.75rem',
      },

      '@media (max-width: 360px)': {
    fontSize: '0.4rem',
  },

      '@media (min-width: 481px) and (max-width: 768px)': {
        fontSize: '0.85rem',
      },
    }}
  >
    {item.date}
  </Typography>
)}

        </Info>

        <Footer>
          <Typography
  variant="body2"
  color="white"
  fontWeight={400}
  sx={{
    fontSize: '0.95rem',
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
    },

    '@media (max-width: 360px)': {
    fontSize: '0.6rem',
  },
    '@media (min-width: 481px) and (max-width: 768px)': {
      fontSize: '0.9rem',
    },
  }}
>
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
