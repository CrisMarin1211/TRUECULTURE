import { useState } from 'react';
import { styled } from '@mui/material/styles';
import theme from '../../../styles/theme';
import { useContext } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CityContext, type City } from '../../../context/CityContext';
const CITIES: City[] = ['Cali, Colombia', 'Bogotá, Colombia'];

const CurrentLocationContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 3,
  color: theme.palette.white.main,
  position: 'relative',
  paddingRight: '30px',
});

const LocationGrid = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
});

const FirstRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontFamily: theme.typography.subtitle1.fontFamily,
  fontSize: '13px',
  color: theme.palette.grayMedium.main,
  lineHeight: '1.2',
});

const ArrowIcon = styled(ArrowDropDownIcon)({
  fontSize: '16px',
  color: theme.palette.grayMedium.main,
  display: 'inline-flex',
  alignItems: 'center',
});

const SecondRow = styled('div')({
  fontFamily: theme.typography.subtitle1.fontFamily,
  fontSize: '13px',
  color: theme.palette.white.main,
  marginTop: '6px',
  lineHeight: '1.3',
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
          Ubicación Actual
          <ArrowIcon />
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
