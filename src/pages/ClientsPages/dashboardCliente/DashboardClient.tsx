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
      <div className="profile-page">
        <div>
          <Header />
        </div>

        <div>
          <CurrentLocation />
          <Box sx={{ px: 2, mt: 5 }}>
            <Box sx={{ mb: 10 }} className="featured-events-box">
              <FeaturedEventList />
            </Box>

            {TAGS.map((tag) => (
              <Box key={tag} sx={{ mb: 10 }} className="event-category-box">
                <EventList tag={tag as any} />
              </Box>
            ))}
          </Box>
        </div>
      </div>
    </>
  );
};

export default DashboardClient;
