import { useState } from 'react';
import { styled } from '@mui/material/styles';
import theme from '../../styles/theme';
import { useContext } from 'react';
import { CityContext } from '../../context/CityContex';
import type { City } from '../../context/CityContex';

const CITIES: City[] = ['Cali, Colombia', 'Bogotá, Colombia'];

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
  fontFamily: theme.typography.subtitle1.fontFamily,
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
  const { city, setCity } = useContext(CityContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeCity = (newCity: City) => {
    setCity(newCity);
    setIsOpen(false);
  };

  return (
    <CurrentLocationContainer>
      <LocationGrid onClick={() => setIsOpen((prev) => !prev)}>
        <FirstRow>Current Location</FirstRow>
        <Arrow>▼</Arrow>
        <SecondRow>{city}</SecondRow>
        <Empty />
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
