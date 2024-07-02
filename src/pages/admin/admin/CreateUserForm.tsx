import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';

const initialUserState = {
  name: '',
  dui: '',
  roleId: '',
  phone: '',
  email: '',
  password: '',
  houseId: '',
};

const CreateUserForm = ({ roles, houses, fetchData }) => {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState(initialUserState);
  const [error, setError] = useState(null);

  const handleCreateUser = () => {
    setOpen(true);
    setNewUser(initialUserState);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser(initialUserState);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/create', newUser);
      await fetchData();
      handleClose();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      setError(error.response?.data?.message || 'Error al guardar usuario');
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleCreateUser} style={{ marginBottom: 10 }}>
        Crear Usuario
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Nuevo Usuario</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            fullWidth
            value={newUser.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="dui"
            label="DUI"
            type="text"
            fullWidth
            value={newUser.dui}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Rol</InputLabel>
            <Select
              name="roleId"
              value={newUser.roleId}
              onChange={handleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Casa</InputLabel>
            <Select
              name="houseId"
              value={newUser.houseId}
              onChange={handleChange}
            >
              {houses.map((house) => (
                <MenuItem key={house.id} value={house.id}>
                  {house.address}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="phone"
            label="Contacto"
            type="text"
            fullWidth
            value={newUser.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={handleChange}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancelar</Button>
          <Button onClick={handleSave} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateUserForm;