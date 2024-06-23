import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import axios from 'axios';

const People = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuType, setMenuType] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, type: string) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
    setMenuType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const latestVisitor = users.find(user => user.roleId === 5 && user.state === 1);

  const renderMenuItem = (item: any) => (
    <MenuItem onClick={handleClose} style={{ minWidth: '320px' }}>
      <Avatar alt={`Foto ${item.name}`} src={`foto${item.name}.jpg`} sx={{ width: 64, height: 64, marginRight: 2 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="subtitle1">{item.name}</Typography>
        <Typography variant="body2" color="textSecondary">{item.dui}</Typography>
        <Typography variant="body2" color="textSecondary">{item.phone}</Typography>
      </div>
    </MenuItem>
  );

  const renderMenu = (type: string, items: any[]) => (
    <Menu
      anchorEl={anchorEl}
      open={menuType === type && Boolean(anchorEl)}
      onClose={handleClose}
    >
      {items.map((item, index) => renderMenuItem(item))}
    </Menu>
  );

  return (
    <div>
      <div onClick={(event) => handleClick(event, 'entradas')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #ccc' }}>
        <Typography variant="body1" style={{ marginRight: '8px' }}>
          Solicitud de Visitantes
        </Typography>
        {menuType === 'entradas' && (isOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />)}
      </div>
      {renderMenu('entradas', latestVisitor ? [latestVisitor] : [])}
      
      <div onClick={(event) => handleClick(event, 'recursos')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #ccc' }}>
        <Typography variant="body1" style={{ marginRight: '8px' }}>
          Actividad de Visitantes
        </Typography>
        {menuType === 'recursos' && (isOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />)}
      </div>
      {renderMenu('recursos', users.filter(user => user.roleId === 5))}
    </div>
  );
};

export default People;