import { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import RadioGroupRating from './RadioRating'; // tu componente de corazones

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (review: { text: string; rating: number }) => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ReviewModal({ open, onClose, onSubmit }: ReviewModalProps) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(3);

  const handlePublish = () => {
    if (!text) return alert('Escribe tu reseña antes de publicar');
    onSubmit({ text, rating });
    setText('');
    setRating(3);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Escribe tu reseña
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Comparte tu experiencia..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Box mt={2} display="flex" justifyContent="center">
          <RadioGroupRating value={rating} onChange={(_, newValue) => setRating(newValue || 3)} />
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handlePublish}
        >
          Publicar
        </Button>
      </Box>
    </Modal>
  );
}
