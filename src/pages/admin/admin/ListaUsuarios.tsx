import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TextField, Button, Table, TableContainer, TableHead, TableBody, 
  TableRow, TableCell, Paper, IconButton, Dialog, DialogActions, 
  DialogContent, DialogTitle, Menu, MenuItem, Container, Select, FormControl, InputLabel 
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const initialUserState = {
  name: '',
  dui: '',
  role: '',
  contact: '',
};

const UserListView = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState(initialUserState);
  const [roles, setRoles] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      if (Array.isArray(response.data)) {
        const updatedUsers = response.data.map(user => {
          const userRole = roles.find(role => role.id === user.roleid);
          return {
            ...user,
            role: userRole ? userRole.roleName : 'Rol Desconocido'
          };
        });
        setUsers(updatedUsers);
      } else {
        console.error('La respuesta no es un array:', response.data);
      }
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

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
  const handleCreateUser = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewUser(initialUserState);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/create', {
        ...newUser,
        roleid: parseInt(newUser.role),
      });

      const createdUser = response.data;
      const selectedRole = roles.find(role => role.id === parseInt(newUser.role));
      
      setUsers(prevUsers => [
        ...prevUsers,
        {
          ...createdUser,
          role: selectedRole ? selectedRole.roleName : 'Rol Desconocido',
        }
      ]);

      handleClose();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setError(error.response?.data?.message);
    }
  };

  const handleEditUser = (userId) => {
    console.log('Editar usuario con ID:', userId);
    // Aquí deberías agregar la lógica para editar el usuario
  };

  const handleDeleteUser = async (userId) => {
    try {
      if (!userId) {
        throw new Error('Error: userId is undefined');
      }

      await axios.delete(`/api/delete/${userId}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <SearchContainer>
        <TextField variant="outlined" label="Buscar usuario" fullWidth />
        <IconButton color="primary" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
      </SearchContainer>
      <Button variant="contained" color="primary" onClick={handleCreateUser} style={{ marginBottom: 10 }}>
        Crear Usuario
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>DUI</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.dui}</TableCell>
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
              name="role"
              value={newUser.role}
              onChange={handleChange}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="contact"
            label="Contacto"
            type="text"
            fullWidth
            value={newUser.contact}
            onChange={handleChange}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancelar</Button>
          <Button onClick={handleSave} color="primary">Guardar</Button>
        </DialogActions>
      </Dialog>
      <Menu id="menu-bar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem component={Link} to="/admin/ver" onClick={handleMenuClose}>Ver Usuarios</MenuItem>
        <MenuItem component={Link} to="/admin/historial" onClick={handleMenuClose}>Historial</MenuItem>
        <MenuItem component={Link} to="/admin/visita" onClick={handleMenuClose}>Visita</MenuItem>
      </Menu>
    </Container>
  );
};

export default UserListView;