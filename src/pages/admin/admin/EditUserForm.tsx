import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  TextField, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';

const EditUserForm = ({ userId, roles, houses, fetchData, handleClose }) => {
  const [open, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: '',
    name: '',
    dui: '',
    roleId: '',
    phone: '',
    email: '',
    password: '',
    houseId: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        if (response.status === 200) {
          setEditedUser(response.data);
          setOpen(true);
        } else {
          console.error('Error al obtener usuario:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error.message);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = useCallback(async () => {
    try {
      await axios.put(`/api/update/${userId}`, editedUser);
      await fetchData();
      handleClose();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      setError(error.response?.data?.message || 'Error al guardar usuario');
    }
  }, [userId, editedUser, fetchData, handleClose]);

  const handleCancel = useCallback(() => {
    setEditedUser({
      id: '',
      name: '',
      dui: '',
      roleId: '',
      phone: '',
      email: '',
      password: '',
      houseId: ''
    });
    handleClose();
  }, [handleClose]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent>
        {Object.keys(editedUser).map(key => (
          <TextField
            key={key}
            margin="dense"
            name={key}
            label={key === 'dui' ? 'DUI' : key.charAt(0).toUpperCase() + key.slice(1)}
            type={key === 'password' ? 'password' : 'text'}
            fullWidth
            value={editedUser[key] || ''}
            onChange={handleChange}
          />
        ))}
        <FormControl fullWidth margin="dense">
          <InputLabel>Rol</InputLabel>
          <Select
            name="roleId"
            value={editedUser.roleId || ''}
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
            value={editedUser.houseId || ''}
            onChange={handleChange}
          >
            {houses.map((house) => (
              <MenuItem key={house.id} value={house.id}>
                {house.address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">Cancelar</Button>
        <Button onClick={handleSave} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

EditUserForm.propTypes = {
  userId: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
  houses: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default EditUserForm;