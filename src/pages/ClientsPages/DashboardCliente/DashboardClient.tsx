import Header from '../../../components/header';
import FeaturedEventList from '../../../components/List/Featured/FeaturedEventList';
import EventList from '../../../components/List/Categorias/EventList';

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
