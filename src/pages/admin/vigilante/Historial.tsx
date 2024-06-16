import React, { useState } from 'react';
import { Container, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const Historial = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', id: '12345678-9', fecha_hora: '123', role: 'Admin', contact: 'juan@example.com' },
    { id: 2, name: 'María López', id: '87654321-0', fecha_hora: '456', role: 'User', contact: 'maria@example.com' }
  ]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="md">
      <SearchContainer>
        <TextField
          variant="outlined"
          label="Ingrese nombre o id"
          fullWidth
        />
        <IconButton color="primary" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
      </SearchContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Fecha y Hora</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Contactos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.fecha_hora}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>
                  {/* Aquí puedes añadir botones de editar y eliminar si es necesario */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        id="menu-bar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to="/vigilante/escaner" onClick={handleMenuClose}>Escaner</MenuItem>
        <MenuItem component={Link} to="/vigilante/historial" onClick={handleMenuClose}>Historial</MenuItem>
      </Menu>
    </Container>
  );
};

export default Historial;