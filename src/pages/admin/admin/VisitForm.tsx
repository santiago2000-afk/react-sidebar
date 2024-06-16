import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(5),
  backgroundColor: '#ffffff',
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
}));

const InputField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const CancelButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginLeft: theme.spacing(1),
}));

const VisitForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dui: '',
    causa: '',
    contacto: '',
    fecha: '',
    hora: ''
  });

  const [errors, setErrors] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.nombre = formData.nombre ? "" : "Este campo es requerido.";
    tempErrors.apellido = formData.apellido ? "" : "Este campo es requerido.";
    tempErrors.dui = formData.dui ? "" : "Este campo es requerido.";
    tempErrors.causa = formData.causa ? "" : "Este campo es requerido.";
    tempErrors.contacto = formData.contacto ? "" : "Este campo es requerido.";
    tempErrors.fecha = formData.fecha ? "" : "Este campo es requerido.";
    tempErrors.hora = formData.hora ? "" : "Este campo es requerido.";
    
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Datos del formulario:', formData);
      // Lógica de envío
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      apellido: '',
      dui: '',
      causa: '',
      contacto: '',
      fecha: '',
      hora: ''
    });
    setErrors({});
  };

  return (
    <Container maxWidth="sm">
      <FormContainer>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Formulario de Visita
          </Typography>
          <IconButton color="primary" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                name="nombre"
                label="Nombre"
                fullWidth
                value={formData.nombre}
                onChange={handleChange}
                {...(errors.nombre && { error: true, helperText: errors.nombre })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="apellido"
                label="Apellido"
                fullWidth
                value={formData.apellido}
                onChange={handleChange}
                {...(errors.apellido && { error: true, helperText: errors.apellido })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="dui"
                label="DUI"
                fullWidth
                value={formData.dui}
                onChange={handleChange}
                {...(errors.dui && { error: true, helperText: errors.dui })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="causa"
                label="Causa"
                fullWidth
                value={formData.causa}
                onChange={handleChange}
                {...(errors.causa && { error: true, helperText: errors.causa })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="contacto"
                label="Contacto"
                fullWidth
                value={formData.contacto}
                onChange={handleChange}
                {...(errors.contacto && { error: true, helperText: errors.contacto })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="fecha"
                label="Fecha"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.fecha}
                onChange={handleChange}
                {...(errors.fecha && { error: true, helperText: errors.fecha })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="hora"
                label="Hora"
                type="time"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.hora}
                onChange={handleChange}
                {...(errors.hora && { error: true, helperText: errors.hora })}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <SubmitButton type="submit" variant="contained" color="primary">
                Enviar
              </SubmitButton>
              <CancelButton type="button" variant="outlined" color="secondary" onClick={handleCancel}>
                Cancelar
              </CancelButton>
            </Grid>
          </Grid>
        </form>
      </FormContainer>

      <Menu
        id="menu-bar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to="/admin/ver" onClick={handleMenuClose}>Ver Usuarios</MenuItem>
        <MenuItem component={Link} to="/admin/historial" onClick={handleMenuClose}>Historial</MenuItem>
        <MenuItem component={Link} to="/admin/visita" onClick={handleMenuClose}>Visita</MenuItem>
      </Menu>
    </Container>
  );
};

export default VisitForm;