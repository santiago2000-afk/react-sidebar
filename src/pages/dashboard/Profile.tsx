import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, CssBaseline, Box } from '@mui/material';
import QRCode from 'react-qr-code';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  marginTop: theme.spacing(5),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(3),
    borderRadius: theme.spacing(1),
  },
}));

const Header = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to right, #3f51b5, #2196f3)',
  height: theme.spacing(20),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: theme.spacing(15),
    borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  border: `4px solid white`,
  backgroundColor: '#f50057',
  fontSize: theme.spacing(7),
  color: 'white',
  position: 'absolute',
  bottom: theme.spacing(-7.5),
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: theme.spacing(5),
    bottom: theme.spacing(-5),
  },
}));

const Content = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: theme.spacing(9),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(7),
  },
}));

const QRCodeContainer = styled('div')({
  marginTop: 16,
  display: 'flex',
  justifyContent: 'center',
});

const Profile = () => {
  const user = {
    name: "Jhon Doe",
    photo: "",
    contact: "75855444",
    residence: "H00001",
    date: "2024-06-23",
    time: "12:00",
    dui: "050764431",
    role: "User",
    email: "jhondoe@prueba.com"
  };

  const initials = user.name.split(' ').map(n => n[0]).join('');

  return (
    <>
      <CssBaseline />
      <StyledCard>
        <Header>
          <StyledAvatar>{initials}</StyledAvatar>
        </Header>
        <Content>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            {user.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography color="textSecondary" gutterBottom>
                Contacto: {user.contact}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Residencia: {user.residence}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                DUI: {user.dui}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography color="textSecondary" gutterBottom>
                Rol: {user.role}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Email: {user.email}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Fecha: {user.date}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Hora: {user.time}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <QRCodeContainer>
                <QRCode value={JSON.stringify(user)} size={128} />
              </QRCodeContainer>
            </Grid>
          </Grid>
        </Content>
      </StyledCard>
    </>
  );
};

export default Profile;