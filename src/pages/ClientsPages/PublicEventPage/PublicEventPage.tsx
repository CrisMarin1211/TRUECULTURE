import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { supabase } from '../../../lib/supabaseClient';
import ViewMore from '../../../components/viewMore/veiwMore';
import type { EventItem } from '../../../types/EventType';
import { useLocation } from "react-router-dom";

async function isLoggedIn() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return !!user;
}

const PublicViewMoreModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [open, setOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loadEvent = async () => {
      const { data } = await supabase.from('events').select('*').eq('id', id).single();
      setEvent(data);
    };
    loadEvent();
  }, [id]);

  const handleClose = async () => {
    setOpen(false);
    if (await isLoggedIn()) {
      navigate('/DashboardClient');
    } else {
      navigate('/login');

    }
  };

  const handleBuy = async (handleBuyOriginal: () => void) => {
    if (!(await isLoggedIn())) {
      navigate('/login', { state: { from: location.pathname } });

      return;
    }
    handleBuyOriginal();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.68)',
        },
      }}
    >
      <Box
        sx={{
          width: '65%',
          height: '80vh',
          bgcolor: '#12121295',
          borderRadius: '12px',
          overflow: 'hidden',
          outline: 'none',
        }}
      >
        {!event ? (
          <h2 style={{ color: 'white', textAlign: 'center' }}>Cargando...</h2>
        ) : (
          <ViewMore item={event} onClose={handleClose} onPublicBuy={handleBuy} />
        )}
      </Box>
    </Modal>
  );
};

export default PublicViewMoreModal;
