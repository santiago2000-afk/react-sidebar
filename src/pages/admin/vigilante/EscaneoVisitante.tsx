/*import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import {
  ThemeProvider,
  makeStyles,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme(); // Create a custom theme

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  qrCodeContainer: {
    textAlign: 'center',
  },
  card: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
  cardContent: {
    paddingBottom: theme.spacing(2),
  },
}));

const EscaneoVisitante = () => {
  const classes = useStyles();
  const [scanData, setScanData] = useState(null);
  const [scanning, setScanning] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    // Request camera permission (if necessary) before starting scan
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.play();

        const qrScanner = new QrScanner(canvasElement, videoElement);
        qrScanner.scan().then((result) => handleScan(result)).catch((error) => {
          console.error('Error scanning:', error);
          setScanning(false); // Stop scanning on error
        });
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });

    // Clean up resources when component unmounts
    return () => {
      if (canvasElement) {
        canvasElement.stopStreams(); // Stop video stream
      }
    };
  }, []); // Empty dependency array to run effect only once

  const handleScan = (data) => {
    if (data) {
      try {
        const visitorData = JSON.parse(data);
        setScanData({
          ...visitorData,
          scanTime: new Date().toLocaleString(),
        });
      } catch (error) {
        console.error('Error parsing QR data:', error);
      } finally {
        setScanning(false);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6} className={classes.qrCodeContainer}>
            <QRCode value="Your QR Code Data" size={200} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setScanning(true)} // Simplified startScanning function
              style={{ marginTop: '10px' }}
              disabled={scanning}
            >
              {scanning ? 'Escaneando...' : 'Escanear QR'}
            </Button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </Grid>
          {scanData && (
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="div">
                    Verificación Exitosa
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {scanData.scanTime}
                  </Typography>
                  <Typography variant="body2" component="div">
                    <strong>Nombre:</strong> {scanData.name}
                    <br />
                    <strong>Contacto:</strong> {scanData.contact}
                    <br />
                    <strong>Residencial:</strong> {scanData.residential}
                    <br />
                    <strong>Anfitrión:</strong> {scanData.host}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default EscaneoVisitante*/