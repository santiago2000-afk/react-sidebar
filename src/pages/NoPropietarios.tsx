import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import QRCode from 'react-qr-code';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const QRCodeContainer = styled('div')({
  margin: 'auto',
});

interface NoPropietario {
  name: string;
  contract: string;
  qrKey: string;
}

interface NoPropietarioProps {
  noPropietario: NoPropietario;
}

const NoPropietarios: React.FC<NoPropietarioProps> = ({ noPropietario }) => {
  const { name, contract, qrKey } = noPropietario;

  return (
    <StyledCard>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <QRCodeContainer>
              <QRCode value={qrKey} size={128} />
            </QRCodeContainer>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="div" align="center">
              {name}
            </Typography>
            <Typography color="textSecondary" align="center" gutterBottom>
              Contrato: {contract}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default NoPropietarios;