import { createContext, useState, useEffect, type ReactNode } from 'react';

type City = 'Cali' | 'Bogota';

type CityContextType = {
  city: City;
  setCity: (newCity: City) => void;
};

export const CityContext = createContext<CityContextType>({
  city: 'Cali',
  setCity: () => {},
});

type Props = {
  children: ReactNode;
};

export const CityProvider = ({ children }: Props) => {
  const [city, setCityState] = useState<City>('Cali');

  useEffect(() => {
    const storedCity = localStorage.getItem('city') as City | null;
    if (storedCity) setCityState(storedCity);
  }, []);

  const setCity = (newCity: City) => {
    localStorage.setItem('city', newCity);
    setCityState(newCity);
  };

  return <CityContext.Provider value={{ city, setCity }}>{children}</CityContext.Provider>;
};
