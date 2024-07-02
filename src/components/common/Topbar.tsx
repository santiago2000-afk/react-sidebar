import React from 'react';
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import { Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Topbar = () => {
  const navigate = useNavigate();

  const handleNotificationsClick = () => {
    navigate('dashboard/notificaciones');
  };

  const handleLogout = async () => {
    try {
      // Envía la solicitud POST al endpoint /api/logout
      await axios.post('/api/logout');

      // Elimina la cookie de sesión
      cookies.remove('sessionCookieName', { path: '/' });

      // Redirige al usuario a la página de inicio de sesión
      navigate('/login');
    } catch (error) {
      // Maneja cualquier error que ocurra durante el logout
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: '#0C7B93',
        color: colorConfigs.topbar.color
      }}
    >
      <Toolbar>
        <IconButton color="inherit" aria-label="Notificaciones" onClick={handleNotificationsClick}>
          <Notifications />
        </IconButton>
        
        <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;