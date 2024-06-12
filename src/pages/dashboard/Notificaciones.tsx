import React from 'react';
import { Container, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Paper, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const NotificationPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const notifications = [
  { id: 1, name: "Notificación 1", description: "Descripción de la notificación 1", imgSrc: "https://via.placeholder.com/64" },
  { id: 2, name: "Notificación 2", description: "Descripción de la notificación 2", imgSrc: "https://via.placeholder.com/64" },
  { id: 3, name: "Notificación 3", description: "Descripción de la notificación 3", imgSrc: "https://via.placeholder.com/64" },
];

const Notificaciones = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Notificaciones
      </Typography>
      <NotificationPaper>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id} alignItems="flex-start" sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={2}>
                  <ListItemAvatar>
                    <Avatar alt={notification.name} src={notification.imgSrc} sx={{ width: 56, height: 56 }} />
                  </ListItemAvatar>
                </Grid>
                <Grid item xs={9} sm={10}>
                  <Box display="flex" flexDirection="column">
                    <Typography variant="subtitle1" gutterBottom>
                      {notification.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {notification.description}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </NotificationPaper>
    </Container>
  );
};

export default Notificaciones;