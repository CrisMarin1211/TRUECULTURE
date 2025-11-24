import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1a181b',
      }}
    >
      <CircularProgress
        size={70}
        thickness={5}
        sx={{
          color: '#fb129eff',
          marginBottom: 2,
           animationDuration: '0.8s',
        }}
      />
      <Typography variant="h6" sx={{ color: '#f8f8f8' }}>
        Cargando...
      </Typography>
    </Box>
  );
};

export default Loader;
