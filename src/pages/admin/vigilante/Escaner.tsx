import React, { useState } from 'react';
import { Container, Paper, Typography, Button, Grid, Card, CardContent, Divider, Alert, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import QrScanner from 'react-qr-scanner';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

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

const ScannerResult = ({ scanResult }) => (
  <Card sx={{ mt: 3, display: scanResult ? 'block' : 'none' }}>
    <CardContent>
      {scanResult && (
        <>
          <Typography variant="h6">Datos del QR</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">Nombre: {scanResult.name}</Typography>
          <Typography variant="body1">Contacto: {scanResult.contact}</Typography>
          <Typography variant="body1">Residencia: {scanResult.residence}</Typography>
          <Typography variant="body2" color="textSecondary">{scanResult.date} {scanResult.time}</Typography>
        </>
      )}
    </CardContent>
  </Card>
);

const Escaner = ({ onScan }) => {
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [showTimeoutAlert, setShowTimeoutAlert] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
          setScanResult(result);
          setScanning(false);
          onScan(result);
          setErrorAlert(false);
          setShowTimeoutAlert(false);
        } else {
          throw new Error('QR no contiene datos válidos');
        }
      } catch (error) {
        console.error("Error al procesar el resultado del escaneo:", error.message);
        handleScanError();
      }
    }
  };

  const handleScanError = () => {
    setErrorAlert(true);
    setScanning(false);
    setShowTimeoutAlert(false);
  };

  const handleStartScan = () => {
    setScanResult(null);
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
                  onError={handleScanError}
                  onScan={(data) => handleScan(data?.text)}
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
                      (scanResult ? `Resultado del escaneo: ${scanResult.name}` : 'No se ha escaneado ningún código QR.')}
                </Typography>
                <ScanButton variant="contained" color="primary" onClick={handleStartScan} fullWidth>
                  Iniciar Escaneo
                </ScanButton>
              </>
            )}
          </Grid>
        </Grid>
      </ScannerContainer>

      <ScannerResult scanResult={scanResult} />

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