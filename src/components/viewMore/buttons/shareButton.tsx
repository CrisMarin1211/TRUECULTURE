import type { ProductItem } from '../../../types/ProductType';
import type { EventItem } from '../../../types/EventType';
import { Box, Button, Stack, Typography } from '@mui/material';
import Spacing from '../avatarGroup/AvatarGroup';
import theme from '../../../styles/theme';

type ItemType = ProductItem | EventItem;

interface ShareButtonProps {
  item: ItemType;
}

const ShareButton = ({ item }: ShareButtonProps) => {
  const handleShare = async () => {
    const shareData = {
      title: 'name' in item ? item.name : 'Producto/Event', // verifica si tiene name
      text:
        'name' in item && 'location' in item
          ? `Mira esto: ${item.name} en ${item.location}`
          : 'Mira este producto/evento',
      url: window.location.href, // o un link específico a la publicación
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Contenido compartido con éxito');
      } else {
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Link copiado al portapapeles');
      }
    } catch (err) {
      console.error('Error compartiendo:', err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.pink.main,
        borderRadius: theme.shape.borderRadius,
        padding: '8px 12px',
        boxShadow: '0px 8px 20px rgba(0,0,0,0.25)',
        width: 'fit-content',
        gap: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Spacing />
        <Stack spacing={0} sx={{ lineHeight: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#fff', lineHeight: 1, m: 0 }}>
            +100
          </Typography>
          <Typography variant="caption" sx={{ color: '#fff', lineHeight: 1, m: 0 }}>
            Compradores
          </Typography>
        </Stack>
      </Stack>

      <Button
        onClick={handleShare}
        variant="contained"
        sx={{
          backgroundColor: theme.palette.blue.main,
          color: '#fff',
          textTransform: 'none',
          borderRadius: theme.shape.borderRadius,
          padding: '4px 12px',
          fontSize: '0.8rem',
          '&:hover': { backgroundColor: '#1565c0' },
        }}
      >
        Compartir
      </Button>
    </Box>
  );
};

export default ShareButton;
