import Header from '../../../components/header';
import FeaturedEventList from '../../../components/list/featured/featuredEventList';
import EventList from '../../../components/list/categories/eventList';

const TAGS = ['Musica', 'Cultural', 'Familiar', 'Diversion', 'Gastronomia'];

const DashboardClient: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <FeaturedEventList />
      </div>
      {TAGS.map((tag) => (
        <EventList key={tag} tag={tag as any} />
      ))}
    </>
  );
};

export default DashboardClient;
