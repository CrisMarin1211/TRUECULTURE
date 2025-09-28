import { Card, CardContent, CardMedia, Stack, Typography, IconButton } from '@mui/material';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import ShareButton from './buttons/shareButton';
import type { ProductItem } from '../../types/ProductType';

interface ViewMoreProductProps {
  item: ProductItem;
  onClose: () => void;
}

const ViewMoreProduct = ({ item, onClose }: ViewMoreProductProps) => {
  return (
    <Card>
      <CardContent>
        {/* Botón de cerrar */}
        <IconButton onClick={onClose}>
          <CloseTwoToneIcon />
        </IconButton>

        <Stack>
          <CardMedia component="img" image={item.image} alt={item.name} />
          <ShareButton />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h5">{item.name}</Typography>

          {/* Descripción */}
          <Stack>
            <Typography variant="h6">Descripción</Typography>
            <Typography>{item.description}</Typography>
          </Stack>

          {/* Stock */}
          <Stack>
            <Typography variant="h6">Disponibilidad</Typography>
            <Typography>
              {item.availableStock} de {item.totalStock} disponibles
            </Typography>
          </Stack>

          {/* Precio */}
          <Typography variant="h6">Precio: ${item.price}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ViewMoreProduct;
