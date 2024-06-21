import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Grid, Typography, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, Select } from '@mui/material';

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
    dui: '',
    rol: 4, // Valor por defecto para 'Visitante'
    contacto: '',
  });

  const [errors, setErrors] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
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
          lastname: '', // Puedes ajustar esto según sea necesario
          dui: formData.dui,
          houseId: null,
          phone: formData.contacto,
          roleId: parseInt(formData.rol), // Asegúrate de parsear a entero según la estructura de roles
          googleUser: null,
          email: null,
          password: null,
          state: 1, // Ajusta según necesidad
        });

        console.log('Usuario creado:', response.data);
        // Lógica adicional después de crear el usuario

        // Limpiar el formulario después del envío exitoso
        setFormData({
          nombre: '',
          dui: '',
          rol: 4, // Resetear a 'Visitante' después del envío
          contacto: '',
        });
        setErrors({});
      } catch (error) {
        console.error('Error al crear usuario:', error);
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      dui: '',
      rol: 4, // Resetear a 'Visitante' después de cancelar
      contacto: '',
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
                  disabled // Para deshabilitar la selección del usuario
                >
                  <MenuItem value={4}>Visitante</MenuItem> {/* Opción 'Visitante' con valor 4 */}
                </Select>
                {/* No se muestra error para 'rol' ya que está deshabilitado */}
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
        <MenuItem component={Link} to="/admin/ver" onClick={handleMenuClose}>Ver Usuarios</MenuItem>
        <MenuItem component={Link} to="/admin/historial" onClick={handleMenuClose}>Historial</MenuItem>
        <MenuItem component={Link} to="/admin/visita" onClick={handleMenuClose}>Visita</MenuItem>
      </Menu>
    </Container>
  );
};

export default VisitForm;
