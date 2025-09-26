import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import theme from '../../styles/theme';

const CITIES = ['Cali, Colombia', 'Bogotá, Colombia'] as const;
type City = (typeof CITIES)[number];

const CurrentLocationContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: '1.8rem',
  margin: '30px 0',
  color: theme.palette.white.main,
  fontFamily: 'sans-serif',
  position: 'relative',
});

const LocationGrid = styled('div')({
  display: 'grid',

  gridTemplateRows: 'auto auto',
  gap: '0.2rem 0.5rem',
  alignItems: 'center',
  cursor: 'pointer',
});

const FirstRow = styled('div')({
  gridColumn: 1,
  gridRow: 1,
  fontFamily: theme.typography.subtitle1.fontFamily, // usa tu theme
  fontWeight: 400,
  fontSize: '16px',
  color: theme.palette.grayMedium.main,
});

const SecondRow = styled('div')({
  gridColumn: 1,
  gridRow: 2,
  fontFamily: theme.typography.subtitle1.fontFamily,
  fontWeight: 600,
  fontSize: '18px',
  color: theme.palette.white.main,
  marginTop: '-16px',
});

const Arrow = styled('div')({
  gridColumn: 2,
  gridRow: 1,
  fontSize: '0.8rem',
  alignSelf: 'center',
});

const Empty = styled('div')({
  gridColumn: 2,
  gridRow: 2,
});

const Dropdown = styled('div')({
  position: 'absolute',
  marginTop: '2rem',
  right: '1.8rem',
  backgroundColor: theme.palette.darkGray1.main,
  borderRadius: 8,
  overflow: 'hidden',
  zIndex: 100,
});

const DropdownOption = styled('div')({
  padding: '8px 12px',
  color: theme.palette.white.main,
  fontFamily: 'sans-serif',
  fontSize: '0.9rem',
  borderBottom: `1px solid ${theme.palette.grayMedium.main}`,
  '&:hover': {
    backgroundColor: theme.palette.grayMedium.main,
  },
});

const CurrentLocation = () => {
  const [city, setCity] = useState<City>('Cali, Colombia');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedCity = localStorage.getItem('city') as City | null;
    if (storedCity && CITIES.includes(storedCity)) {
      setCity(storedCity);
    }
  }, []);

  const handleChangeCity = (newCity: City) => {
    setCity(newCity);
    localStorage.setItem('city', newCity);
    setIsOpen(false);
  };

  return (
    <CurrentLocationContainer>
      <LocationGrid onClick={() => setIsOpen((prev) => !prev)}>
        <FirstRow>Current Location</FirstRow>
        <Arrow>▼</Arrow>
        <SecondRow>{city}</SecondRow>
        <Empty></Empty>
      </LocationGrid>

      {isOpen && (
        <Dropdown>
          {CITIES.map((c) => (
            <DropdownOption key={c} onClick={() => handleChangeCity(c)}>
              {c}
            </DropdownOption>
          ))}
        </Dropdown>
      )}
    </CurrentLocationContainer>
  );
};

export default CurrentLocation;
