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
        backgroundColor: '#181818',
      }}
    >
      <CircularProgress
        size={70}
        thickness={5}
        sx={{
          color: '#dcbadb',
          marginBottom: 2,
        }}
      />
      <Typography variant="h6" sx={{ color: '#f8f8f8' }}>
        Cargando...
      </Typography>
    </Box>
  );
};

export default Loader;
