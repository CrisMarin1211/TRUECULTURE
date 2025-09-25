import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
} from '@mui/material';

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

          <List>
            <ListItem>Main Navigation</ListItem>
            <ListItem>Dashboard</ListItem>
            <ListItem>Manejar Evento</ListItem>
            <ListItem>Manejar Producto</ListItem>
            <ListItem>Reservas y entradas</ListItem>
            <ListItem>Reseñas Promedio</ListItem>
            <ListItem>Analiticas y reportes</ListItem>
          </List>

          <Divider />

          <Typography>Support and Settings</Typography>
          <Typography>Configuraciones</Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default SideBarAdmins;
