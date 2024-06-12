import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton } from "@mui/material";
import { Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

const Topbar = () => {
  const navigate = useNavigate();

  const handleNotificationsClick = () => {
    navigate('dashboard/notificaciones');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Inicio
        </Typography>
        <IconButton color="inherit" aria-label="Notificaciones" onClick={handleNotificationsClick}>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;