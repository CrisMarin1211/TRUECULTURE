import CardClient from '../../../components/EventFeatures/Components - client/EventCard-Client/CardClient';
import type { EventItem } from '../../../types/EventType';

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
