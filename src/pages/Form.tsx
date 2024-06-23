import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, Grid, Typography, Paper, IconButton, Menu, MenuItem,
  FormControl, InputLabel, Select
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

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

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    dui: '',
    rol: 4,
    contacto: '',
    houseId: '',
  });

  const [errors, setErrors] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [roles, setRoles] = useState([]);
  const [houses, setHouses] = useState([]);
  const [housesLoading, setHousesLoading] = useState(false);
  const [housesError, setHousesError] = useState(null);

  useEffect(() => {
    fetchRoles();
    fetchHouses();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      if (Array.isArray(response.data)) {
        setRoles(response.data);
      } else {
        console.error('La respuesta de roles no es un array:', response.data);
      }
    } catch (error) {
      console.error('Error al obtener roles:', error);
    }
  };

  const fetchHouses = async () => {
    setHousesLoading(true);
    try {
      const response = await axios.get('/api/houses');
      if (Array.isArray(response.data)) {
        setHouses(response.data);
      } else {
        console.error('La respuesta de casas no es un array:', response.data);
      }
    } catch (error) {
      console.error('Error al obtener casas:', error);
      setHousesError('Error al obtener casas. Por favor, inténtalo nuevamente.');
    } finally {
      setHousesLoading(false);
    }
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.nombre = formData.nombre ? "" : "Este campo es requerido.";
    tempErrors.dui = formData.dui ? "" : "Este campo es requerido.";
    tempErrors.rol = formData.rol ? "" : "Este campo es requerido.";
    tempErrors.contacto = formData.contacto ? "" : "Este campo es requerido.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('/api/create', {
          name: formData.nombre,
          lastname: '',
          dui: formData.dui,
          houseId: formData.houseId || null,
          phone: formData.contacto,
          roleId: parseInt(formData.rol),
          googleUser: null,
          email: null,
          password: null,
          state: 1,
        });

        console.log('Usuario creado:', response.data);
        setFormData({
          nombre: '',
          dui: '',
          rol: 4,
          contacto: '',
          houseId: '',
        });
        setErrors({});
      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      dui: '',
      rol: 4,
      contacto: '',
      houseId: '',
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
                name="dui"
                label="DUI"
                fullWidth
                value={formData.dui}
                onChange={handleChange}
                {...(errors.dui && { error: true, helperText: errors.dui })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="rol-select">Rol</InputLabel>
                <Select
                  value={formData.rol}
                  onChange={handleChange}
                  inputProps={{
                    name: 'rol',
                    id: 'rol-select',
                  }}
                  fullWidth
                  disabled
                >
                  <MenuItem value={4}>Visitante</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="house-select">Casa</InputLabel>
                <Select
                  value={formData.houseId}
                  onChange={handleChange}
                  inputProps={{
                    name: 'houseId',
                    id: 'house-select',
                  }}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Seleccione una casa</em>
                  </MenuItem>
                  {houses.map(house => (
                    <MenuItem key={house.id} value={house.id}>
                      {house.address}
                    </MenuItem>
                  ))}
                </Select>
                {housesLoading && <Typography variant="caption">Cargando casas...</Typography>}
                {housesError && <Typography variant="caption" color="error">{housesError}</Typography>}
              </FormControl>
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
        <MenuItem component={Link} to="/dashboard/request" onClick={handleMenuClose}>Solicitudes</MenuItem>
        <MenuItem component={Link} to="/dashboard/profile" onClick={handleMenuClose}>Perfil</MenuItem>
        <MenuItem component={Link} to="/dashboard/historial" onClick={handleMenuClose}>Historial</MenuItem>
      </Menu>
    </Container>
  );
};

export default Formulario;