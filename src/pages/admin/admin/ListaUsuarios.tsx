import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Button, Table, TableContainer, TableHead, TableBody,
  TableRow, TableCell, Paper, IconButton, Menu, MenuItem, Container
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const UserListView = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [houses, setHouses] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [usersResponse, rolesResponse, housesResponse] = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/roles'),
        axios.get('/api/houses')
      ]);
      setUsers(usersResponse.data);
      setRoles(rolesResponse.data);
      setHouses(housesResponse.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError(error.message || 'Error al obtener datos');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEditUser = (userId) => setSelectedUserId(userId);

  const handleDeleteUser = async (userId) => {
    if (!userId) {
      console.error('Error: userId is undefined');
      return;
    }

    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`/api/delete/${userId}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setError(error.message || 'Error al eliminar usuario');
    }
  };

  return (
    <Container maxWidth="md">
      <SearchContainer>
        <IconButton color="primary" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
      </SearchContainer>
      <CreateUserForm roles={roles} houses={houses} fetchData={fetchData} />
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
                <TableCell>{user.roleId}</TableCell>
                <TableCell>{user.phone}</TableCell>
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
      {selectedUserId && (
        <EditUserForm
          userId={selectedUserId}
          roles={roles}
          houses={houses}
          fetchData={fetchData}
          handleClose={() => setSelectedUserId(null)}
        />
      )}
      <Menu id="menu-bar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem component={Link} to="/admin/ver" onClick={handleMenuClose}>Ver Usuarios</MenuItem>
        <MenuItem component={Link} to="/admin/historial" onClick={handleMenuClose}>Historial</MenuItem>
        <MenuItem component={Link} to="/admin/visita" onClick={handleMenuClose}>Visita</MenuItem>
      </Menu>
    </Container>
  );
};

export default UserListView;