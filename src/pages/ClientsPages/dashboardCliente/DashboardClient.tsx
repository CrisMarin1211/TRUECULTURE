import Header from '../../../components/header';
import FeaturedEventList from '../../../components/List/Featured/featuredEventList/index';
import EventList from '../../../components/List/categories/eventList/EventList';
import { Box } from '@mui/material';
import CurrentLocation from '../../../components/atomsUi/currentLocation';
import './dashboard.css';

const TAGS = ['Musica', 'Cultural', 'Familiar', 'Diversion', 'Gastronomia'];

const DashboardClient: React.FC = () => {
  return (
    <>
      <Header />

      <Box
        sx={{
          px: 2,
          mt: 2,
          display: 'flex',
          justifyContent: { xs: 'flex-start', md: 'center' }, // móvil izquierda, desktop centrado
          alignItems: 'center',
        }}
      >
        <CurrentLocation />
      </Box>
      <Box
        sx={{
          mt: 5,
          maxWidth: { md: 1000 },
          mx: { md: 'auto' },
        }}
      >
        <Box
          sx={{
            mb: 10,
            maxWidth: { md: 1000 },
          }}
        >
          <FeaturedEventList />
        </Box>

        {TAGS.map((tag) => (
          <Box
            key={tag}
            sx={{
              mb: 10,
              maxWidth: { md: 1100 },
              mx: { md: 'auto' },
            }}
          >
            {' '}
            <EventList tag={tag as any} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default DashboardClient;
