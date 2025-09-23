import { Card, CardContent, CardMedia, Typography, Button, Divider } from '@mui/material';

function SideBarAdmins() {
  return (
    <>
      <Card>
        <CardMedia>
          <img src="" alt="" />
        </CardMedia>
        <CardContent>
          <Button> añade evento</Button>
          <Button> añade producto</Button>
          <Divider />

          <Typography>Main Navigation</Typography>
          <Typography>Dashboard</Typography>
          <Typography>Manejar Evento</Typography>
          <Typography>Manejar Producto</Typography>
          <Typography>Reservas y entradas</Typography>
          <Typography>Reseñas Promedio</Typography>
          <Typography>Analiticas y reportes</Typography>

          <Divider />
          <Typography>Support and Settings</Typography>
          <Typography>Configuraciones</Typography>

          <Divider />
          <Typography>Aditional Items</Typography>
          <Typography>Ma</Typography>
          <Typography>Dashboard</Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default SideBarAdmins;
