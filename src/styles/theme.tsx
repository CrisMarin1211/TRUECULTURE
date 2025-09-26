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
    white: { main: '#FFFFFF' },
    green: { main: '#99CB36' },
    pink: { main: '#FF0099' },
    blue: { main: '#5669FF' },
    darkGray1: { main: '#232323' },
    darkGray2: { main: '#353535' },
    beige: { main: '#FFF3E5' },
    black70: { main: 'rgba(0, 0, 0, 0.7)' },
    grayMedium: { main: '#4F4F4F' },
  },

  typography: {
    fontFamily: "'Satoshi-Regular', 'ClashDisplay-Regular',sans-serif",

    h1: {
      fontFamily: "'Satoshi-Black',sans-serif",
      fontSize: '64px',
      fontWeight: 900,
      lineHeight: '24px',
      wordWrap: 'break-word',
    },
    h2: {
      fontFamily: "'Satoshi-Black',sans-serif",
      fontSize: '40px',
      fontWeight: 900,
      lineHeight: '24px',
      color: '#FFFFFF',
      wordWrap: 'break-word',
    },
    h3: {
      fontFamily: "'Satoshi-Black',sans-serif",
      fontSize: '30.72px',
      fontWeight: 900,
      lineHeight: '24px',
      color: '#FFFFFF',
      wordWrap: 'break-word',
    },
    h4: {
      fontFamily: "'Satoshi-Black',sans-serif",
      fontSize: '49.61px',
      fontWeight: 900,
      color: '#FFFFFF',
      wordWrap: 'break-word',
    },
    h5: {
      fontFamily2: "'ClashDisplay-Bold',sans-serif",
      fontSize: '44.1px',
      fontWeight: 700,
      lineHeight: '39.57px',
      color: '#FFFFFF',
      wordWrap: 'break-word',
    },
    h6: {
      fontFamily2: "'ClashDisplay-Bold',sans-serif",
      fontSize: '35.52px',
      fontWeight: 700,
      lineHeight: '31.88px',
      color: '#FFFFFF',
      wordWrap: 'break-word',
    },

    subtitle1: {
      fontFamily: "'Satoshi-Medium',sans-serif",
      fontSize: '14.57px',
      fontWeight: 700,
      lineHeight: '21.86px',
      color: '#FFFFFF',
      wordWrap: 'break-word',
    },
    subtitle2: {
      fontFamily: "'Satoshi-Bold', 'ClashDisplay-Regular',sans-serif",
      fontSize: '14.57px',
      fontWeight: 900,
      lineHeight: '21.86px',
      color: '#FFFFFF',
      wordWrap: 'break-word',
    },

    body1: {
      fontFamily: "'Satoshi-Medium',sans-serif",
      fontSize: '22.68px',
      fontWeight: 500,
      lineHeight: '39.69px',
      color: '#FFFFFF',
      wordWrap: 'break-word',
    },
    body2: {
      fontFamily: "'Satoshi-Medium',sans-serif",
      fontSize: '16.09px',
      fontWeight: 500,
      color: '#000000',
      wordWrap: 'break-word',
    },

    button: {
      fontFamily: "'Satoshi-Medium',sans-serif",
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: '20px',
      textTransform: 'none',
      color: '#FFFFFF',
      wordWrap: 'break-word',
    },
    caption: {
      fontFamily: "'Satoshi-Medium',sans-serif",
      fontSize: '17.01px',
      fontWeight: 500,
      color: '#747688',
      wordWrap: 'break-word',
    },
    overline: {
      fontFamily: "'Satoshi-Medium',sans-serif",
      fontSize: '25.86px',
      fontWeight: 500,
      lineHeight: '38.79px',
      color: '#979797',
      wordWrap: 'break-word',
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 100,
  },
});

export default theme;
