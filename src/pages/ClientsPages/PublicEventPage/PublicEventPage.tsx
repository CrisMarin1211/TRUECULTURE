import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { supabase } from '../../../lib/supabaseClient';
import ViewMore from '../../../components/viewMore/veiwMore';
import type { EventItem } from '../../../types/EventType';
import { useLocation } from 'react-router-dom';
import './PublicEventPage.css';

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
    <div className="profile-page">
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 0, md: 2 },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.68)',
          },
        }}
      >
        <Box
          sx={{
            width: { xs: '98%', sm: '90%', md: '70%', lg: '55%' },
            maxWidth: { xs: 'none', sm: 480, md: 750, lg: 950 },
            minWidth: { xs: 'none', sm: 260, md: 350 },
            height: { xs: '98vh', md: '80vh' },
            bgcolor: '#12121295',
            borderRadius: { xs: '8px', md: '12px' },
            overflow: 'hidden',
            outline: 'none',
            p: { xs: 1, sm: 2, md: 3 },
            boxShadow: { xs: 2, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {!event ? (
            <h2 style={{ color: 'white', textAlign: 'center' }}>Cargando...</h2>
          ) : (
            <ViewMore item={event} onClose={handleClose} onPublicBuy={handleBuy} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PublicViewMoreModal;
