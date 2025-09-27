import Header from '../../../components/header';
import FeaturesEventList from '../../../components/List/Featured/featuredEventList/index';
import EventList from '../../../components/List/categories/eventList/EventList';

const TAGS = ['Musica', 'Cultural', 'Familiar', 'Diversion', 'Gastronomia'];

const DashboardClient: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <FeaturesEventList />
      </div>
      {TAGS.map((tag) => (
        <EventList key={tag} tag={tag as any} />
      ))}
    </>
  );
};
export default DashboardClient;
