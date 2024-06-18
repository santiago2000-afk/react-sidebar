import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Container } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const UserListView = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', dui: '', houseNumber: '', role: '', address: '', contact: '' });
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user');
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('La respuesta no es un array:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
  
    fetchUsers();
  
  }, []);  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateUser = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser({ name: '', dui: '', houseNumber: '', role: '', address: '', contact: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSave = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    handleClose();
  };

  const handleEditUser = (userId) => {
    console.log('Editar usuario con ID:', userId);
  };

  const handleDeleteUser = (userId) => {
    console.log('Eliminar usuario con ID:', userId);
  };

  return (
    <Container maxWidth="md">
      <SearchContainer>
        <TextField
          variant="outlined"
          label="Buscar usuario"
          fullWidth
        />
        <IconButton color="primary" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
      </SearchContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateUser}
        style={{ marginBottom: 10 }}
      >
        Crear Usuario
      </Button>

      {/* Tabla de usuarios */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>DUI</TableCell>
              <TableCell>Número de Casa</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.dui}</TableCell>
                <TableCell>{user.houseNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditUser(user.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Nuevo Usuario</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
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
          <TextField
            margin="dense"
            name="houseNumber"
            label="Número de Casa"
            type="text"
            fullWidth
            value={newUser.houseNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Rol"
            type="text"
            fullWidth
            value={newUser.role}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Dirección"
            type="text"
            fullWidth
            value={newUser.address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="contact"
            label="Contacto"
            type="email"
            fullWidth
            value={newUser.contact}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
          <Button onClick={() => setNewUser({ name: '', dui: '', houseNumber: '', role: '', address: '', contact: '' })} color="secondary">
            Limpiar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Menú desplegable */}
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

export default UserListView;