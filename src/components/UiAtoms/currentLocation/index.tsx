import { useState } from 'react';
import { styled } from '@mui/material/styles';
import theme from '../../styles/theme';
import { useContext } from 'react';
import { CityContext } from '../../context/CityContex';
import type { City } from '../../context/CityContex';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const CITIES: City[] = ['Cali, Colombia', 'Bogotá, Colombia'];

const CurrentLocationContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 3,
  color: theme.palette.white.main,
  position: 'relative',
});

const LocationGrid = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto auto',
  alignItems: 'center',
  cursor: 'pointer',
});

const FirstRow = styled('div')({
  gridColumn: 1,
  gridRow: 1,
  fontFamily: theme.typography.subtitle1.fontFamily,
  fontSize: '13px',
  color: theme.palette.grayMedium.main,
});

const SecondRow = styled('div')({
  gridColumn: 1,
  gridRow: 2,
  fontFamily: theme.typography.subtitle1.fontFamily,
  fontSize: '13px',
  color: theme.palette.white.main,
  marginTop: '-22px',
});

const Dropdown = styled('div')({
  position: 'absolute',
  marginTop: '2rem',
  width: '125px',
  backgroundColor: theme.palette.background.default,
  borderRadius: 8,
  overflow: 'hidden',
  zIndex: 100,
});

const DropdownOption = styled('div')({
  padding: '8px 12px',
  color: theme.palette.white.main,
  fontSize: '10px',
  borderBottom: `1px solid ${theme.palette.grayMedium.main}`,
  '&:hover': {
    backgroundColor: theme.palette.blue.main,
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
    <CurrentLocationContainer sx={{ cursor: 'pointer' }}>
      <LocationGrid onClick={() => setIsOpen((prev) => !prev)}>
        <FirstRow>
          Current Location
          <ArrowDropDownIcon />{' '}
        </FirstRow>
        <SecondRow>{city}</SecondRow>
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
