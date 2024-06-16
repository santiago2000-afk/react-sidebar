import React, { useState } from 'react';
import { TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Menu, MenuItem, Container } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

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
                    label="Ingrese nombre o ID"
                    fullWidth
                />
                <IconButton color="primary" onClick={handleMenuOpen}>
                    <MenuIcon />
                </IconButton>
            </SearchContainer>

            {/* Tabla de usuarios */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Fecha y Hora</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Contactos</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

export default Historial;