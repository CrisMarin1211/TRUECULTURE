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
    const type = 'totalseats' in item ? 'event' : 'product';
    const url = `${window.location.origin}/${type}/${item.id}`;

    const shareData = {
      title: item.name ?? 'Producto/Event',
      text: `Mira esto: ${item.name}`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Contenido compartido con éxito');
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copiado al portapapeles: ' + url);
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
        padding: { xs: '6px 10px', sm: '7px 11px', md: '8px 12px' },
        boxShadow: '0px 8px 20px rgba(0,0,0,0.25)',
        width: 'fit-content',
        gap: { xs: 1.5, md: 2 },
        maxWidth: { xs: '90%', sm: '80%', md: 'none' },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Spacing />
        <Stack spacing={0} sx={{ lineHeight: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: '#fff',
              lineHeight: 1,
              m: 0,
              fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
            }}
          >
            +100
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#fff',
              lineHeight: 1,
              m: 0,
              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
            }}
          >
            Compradores
          </Typography>
        </Stack>
      </Stack>

      <Button
        onClick={handleShare}
        variant="contained"
        type="button"
        sx={{
          backgroundColor: theme.palette.blue.main,
          color: '#fff',
          textTransform: 'none',
          borderRadius: theme.shape.borderRadius,
          padding: { xs: '3px 10px', sm: '4px 11px', md: '4px 12px' },
          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
          '&:hover': { backgroundColor: '#1565c0' },
        }}
      >
        Compartir
      </Button>
    </Box>
  );
};

export default ShareButton;
