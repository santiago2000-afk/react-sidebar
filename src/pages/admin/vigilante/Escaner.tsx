import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Grid, Card, CardContent, Divider, Alert, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import QrScanner from 'react-qr-scanner';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

const ScannerContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(5),
  backgroundColor: '#ffffff',
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
}));

const ScanButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const AlertMessage = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ScannerResult = ({ user }) => (
  <Card sx={{ mt: 3, display: user ? 'block' : 'none' }}>
    <CardContent>
      {user && (
        <>
          <Typography variant="h6">Usuario Autenticado</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">Nombre: {user.name}</Typography>
          <Typography variant="body1">Contacto: {user.phone}</Typography>
          <Typography variant="body1">DUI: {user.dui}</Typography>
          <Typography variant="body1">Rol: {user.roleId}</Typography>
        </>
      )}
    </CardContent>
  </Card>
);

const Escaner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [user, setUser] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [showTimeoutAlert, setShowTimeoutAlert] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Obtener datos de usuarios al cargar el componente
  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsersData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de usuarios:', error);
      });
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleScan = (data) => {
    if (data) {
      try {
        const result = JSON.parse(data);
        if (typeof result === 'object' && result !== null) {
          // Verificar que el objeto contiene los campos necesarios
          if (result.nombre && result.dui && result.rol && result.contacto) {
            // Buscar coincidencia en el listado de usuarios
            const matchedUser = usersData.find(user =>
              user.name === result.nombre &&
              user.dui === result.dui &&
              user.phone === result.contacto &&
              user.roleId === result.rol
            );

            if (matchedUser) {
              setScanResult(result);
              setUser(matchedUser);
              setScanning(false);
              setErrorAlert(false);
              setShowTimeoutAlert(false);
              return; // Salir de la función si se encontró un usuario coincidente
            } else {
              throw new Error('El código QR escaneado no coincide con ningún usuario válido.');
            }
          } else {
            throw new Error('El código QR no contiene los datos necesarios (nombre, dui, rol, contacto).');
          }
        } else {
          throw new Error('QR no contiene datos válidos');
        }
      } catch (error) {
        console.error("Error al procesar el resultado del escaneo:", error.message);
        setErrorAlert(true);
        setScanning(false);
        setShowTimeoutAlert(false);
      }
    }
  };

  const handleStartScan = () => {
    setScanResult(null);
    setUser(null);
    setErrorAlert(false);
    setShowTimeoutAlert(false);
    setScanning(true);
  };

  const handleStopScan = () => {
    setScanning(false);
    setShowTimeoutAlert(false);
  };

  return (
    <Container maxWidth="sm">
      <ScannerContainer>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Escanear Código QR
          </Typography>
          <IconButton color="primary" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        </Grid>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            {scanning ? (
              <>
                <QrScanner
                  delay={300}
                  onError={() => setErrorAlert(true)}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                />
                <ScanButton variant="contained" color="secondary" onClick={handleStopScan} fullWidth>
                  Detener Escaneo
                </ScanButton>
              </>
            ) : (
              <>
                <Typography variant="body1" align="center">
                  {showTimeoutAlert ? '10 segundos sin detectar código QR. Vuelva a intentarlo.' :
                    errorAlert ? 'Código QR incorrecto o no contiene datos válidos. Por favor, escanee un código QR válido.' :
                      (scanResult ? `Resultado del escaneo: ${scanResult.nombre}` : 'No se ha escaneado ningún código QR.')}
                </Typography>
                <ScanButton variant="contained" color="primary" onClick={handleStartScan} fullWidth>
                  Iniciar Escaneo
                </ScanButton>
              </>
            )}
          </Grid>
        </Grid>
      </ScannerContainer>

      <ScannerResult user={user} />

      <Menu
        id="menu-bar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to="/vigilante/escaner" onClick={handleMenuClose}>Escaner</MenuItem>
        <MenuItem component={Link} to="/vigilante/historial" onClick={handleMenuClose}>Historial</MenuItem>
      </Menu>

      {errorAlert && (
        <AlertMessage severity="error" sx={{ mt: 2 }}>
          Código QR incorrecto o no contiene datos válidos. Por favor, escanee un código QR válido.
        </AlertMessage>
      )}
      {showTimeoutAlert && (
        <AlertMessage severity="warning" sx={{ mt: 2 }}>
          10 segundos sin detectar código QR. Vuelva a intentarlo.
        </AlertMessage>
      )}
    </Container>
  );
};

export default Escaner;