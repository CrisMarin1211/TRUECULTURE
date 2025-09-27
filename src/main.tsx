import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { EventProvider } from './context/eventContext.tsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme.tsx';
import { CityProvider } from './context/cityContex.tsx';
import './index.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CityProvider>
        <EventProvider>
          <App />
        </EventProvider>
      </CityProvider>
    </ThemeProvider>
  </StrictMode>,
);
