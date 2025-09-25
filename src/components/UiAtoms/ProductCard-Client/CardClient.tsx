import type { ProductItem } from '../../../types/ProductType';
import type { EventItem } from '../../../types/EventType';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './CardClient.css';

interface ClientCardProps {
  item: ProductItem | EventItem;
}

const CardClient: React.FC<ClientCardProps> = ({ item }) => {
  return (
    <Card className="card-client">
      <CardMedia
        className="card-client__image"
        component="img"
        image={item.image}
        alt={item.name}
      />
      <CardContent
        className="card-client__content"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingBottom: 2,
        }}
      >
        <div
          className="card-client__info"
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          <Typography className="card-client__title" variant="caption" component="div">
            {item.location}
          </Typography>
          <Typography className="card-client__subtitle" variant="h5" component="div">
            {item.name}
          </Typography>
          <div className="card-client__details" style={{ marginTop: 12 }}>
            {'date' in item && item.date && (
              <Typography
                className="card-client__date"
                variant="body2"
                component="span"
                sx={{ fontWeight: 900, marginRight: 2 }}
              >
                {item.date}
              </Typography>
            )}
            <Typography className="card-client__price" variant="body2" component="span">
              ${item.price}
            </Typography>
          </div>
        </div>
        <CardActions sx={{ padding: 0 }}>
          <Button
            className="card-client__button"
            variant="contained"
            sx={{
              backgroundColor: '#99CB36',
              borderRadius: '999px',
              padding: '8px 16px',
              fontWeight: 500,
              fontFamily: 'Satoshi',
            }}
          >
            Ver detalles{' '}
            <span style={{ marginLeft: 8, transform: 'rotate(45deg)', display: 'inline-block' }}>
              ↗
            </span>
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CardClient;
