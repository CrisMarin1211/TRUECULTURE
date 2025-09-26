import Header from '../../../components/header';
import CardClient from '../../../components/UiAtoms/ProductCard-Client/CardClient';
import type { EventItem } from '../../../types/EventType';

const DashboardClient = () => {
  const eventoEjemplo: EventItem = {
    id: '1',
    image: '/ruta/imagen.jpg',
    imageFile: null,
    name: 'Clase de salsa',
    date: 'Agosto 26',
    time: '20:00',
    location: 'Salón Principal',
    price: 10,
    description: 'blablabañ',
    totalSeats: 100,
    availableSeats: 80,
    popularity: 'Alta',
    tags: 'Diversion',
    expectedAttendance: 90,
  };

  return (
    <>
      <Header />
      <CardClient item={eventoEjemplo} />
    </>
  );
};

export default DashboardClient;
