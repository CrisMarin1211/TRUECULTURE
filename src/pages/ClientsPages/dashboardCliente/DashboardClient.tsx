import Header from '../../../components/header';
import FeaturedEventList from '../../../components/List/Featured/featuredEventList/index';
import EventList from '../../../components/List/categories/eventList/EventList';

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
