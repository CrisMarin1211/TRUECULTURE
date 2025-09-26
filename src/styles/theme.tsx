import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
    green: Palette['primary'];
    pink: Palette['primary'];
    blue: Palette['primary'];
    darkGray1: Palette['primary'];
    darkGray2: Palette['primary'];
    beige: Palette['primary'];
    black70: Palette['primary'];
    grayMedium: Palette['primary'];
  }
  interface PaletteOptions {
    white?: PaletteOptions['primary'];
    green?: PaletteOptions['primary'];
    pink?: PaletteOptions['primary'];
    blue?: PaletteOptions['primary'];
    darkGray1?: PaletteOptions['primary'];
    darkGray2?: PaletteOptions['primary'];
    beige?: PaletteOptions['primary'];
    black70?: PaletteOptions['primary'];
    grayMedium?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: '#1A181B',
    },
    white: {
      main: '#FFFFFF',
    },
    green: {
      main: '#99CB36',
    },
    pink: {
      main: '#FF0099',
    },
    blue: {
      main: '#5669FF',
    },
    darkGray1: {
      main: '#232323',
    },
    darkGray2: {
      main: '#353535',
    },
    beige: {
      main: '#FFF3E5',
    },
    black70: {
      main: 'rgba(0, 0, 0, 0.7)',
    },
    grayMedium: {
      main: '#4F4F4F',
    },
  },

  typography: {
    fontFamily: "'Satoshi-Regular', Arial, sans-serif",

    h1: {
      fontFamily: "'ClashDisplay-Bold', Arial, sans-serif",
      fontSize: '96.3px',
      lineHeight: '90px',
      letterSpacing: '-0.35px',
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Satoshi-Black', Arial, sans-serif",
      fontSize: '64px',
      fontWeight: 900,
    },
    h3: {
      fontFamily: "'Satoshi-Black', Arial, sans-serif",
      fontSize: '40px',
      fontWeight: 900,
    },
    h4: {
      fontFamily: "'Satoshi-Black', Arial, sans-serif",
      fontSize: '44.1px',
      fontWeight: 900,
    },
    h5: {
      fontFamily: "'Satoshi-Black', Arial, sans-serif",
      fontSize: '30.7px',
      fontWeight: 900,
    },
    h6: {
      fontFamily: "'ClashDisplay-Bold', Arial, sans-serif",
      fontSize: '35.52px',
      fontWeight: 700,
      letterSpacing: '-1.5px',
    },
  },

  shape: {
    borderRadius: 100,
  },
});

export default theme;
