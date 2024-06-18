import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, CssBaseline } from '@mui/material';
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

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: 'auto',
}));

const QRCodeContainer = styled('div')({
  margin: 'auto',
});

interface User {
  name: string;
  photo: string;
  contact: string;
  residence: string;
  date: string;
  time: string;
}

interface UserProfileProps {
  user: User;
}

const Profile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <StyledCard>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <StyledAvatar alt={user.name} src={user.photo} />
          </Grid>
          <Grid item xs={12} sm={8} style={{ textAlign: 'center' }}>
            <Typography variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Contacto: {user.contact}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Residencia: {user.residence}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Fecha: {user.date}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Hora: {user.time}
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <QRCodeContainer>
              <QRCode value={JSON.stringify(user)} size={128} />
            </QRCodeContainer>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default Profile;