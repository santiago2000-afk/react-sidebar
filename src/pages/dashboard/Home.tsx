import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material'; 
import axios from 'axios';

const Home = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuType, setMenuType] = useState('');
  const [recentEntries, setRecentEntries] = useState<{ name: string; dui: string; phone: string }[]>([]);
  const [habitants, setHabitants] = useState<{ name: string; description: string; imgSrc: string }[]>([]);

  const fetchRecentEntries = async () => {
    try {
      const response = await axios.get('/api/users');
      const lastEntry = response.data[response.data.length - 1];
      setRecentEntries([lastEntry]);
    } catch (error) {
      console.error('Error al obtener las entradas recientes:', error);
    }
  };

  const fetchHabitants = async () => {
    try {
      const response = await axios.get('/api/users');
      setHabitants(response.data);
    } catch (error) {
      console.error('Error al obtener los habitantes:', error);
    }
  };

  useEffect(() => {
    fetchRecentEntries();
    fetchHabitants();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, type: string) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
    setMenuType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const renderMenuItem = (items: { name: string; dui?: string; phone?: string }[]) =>
    items.map((item, index) => (
      <MenuItem key={index} onClick={handleClose} style={{ width: '400px' }}>
        <Avatar alt={`Foto ${index + 1}`} sx={{ width: 64, height: 64, marginRight: 2 }}>
          {item.name.charAt(0).toUpperCase()}
        </Avatar>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="subtitle1">{item.name}</Typography>
          {item.dui && <Typography variant="body2" color="textSecondary">DUI: {item.dui}</Typography>}
          {item.phone && <Typography variant="body2" color="textSecondary">Phone: {item.phone}</Typography>}
        </div>
      </MenuItem>
    ));

  const renderMenu = (type: string, items: { name: string; description: string; imgSrc: string }[]) => (
    <Menu
      anchorEl={anchorEl}
      open={menuType === type && Boolean(anchorEl)}
      onClose={handleClose}
    >
      {renderMenuItem(items)}
    </Menu>
  );

  return (
    <div>
      <div onClick={(event) => handleClick(event, 'entradas')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #ccc' }}>
        <Typography variant="body1" style={{ marginRight: '8px' }}>
          Entradas Recientes
        </Typography>
        {menuType === 'entradas' && (isOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />)}
      </div>
      {renderMenu('entradas', recentEntries)}
      
      <div onClick={(event) => handleClick(event, 'habitantes')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #ccc' }}>
        <Typography variant="body1" style={{ marginRight: '8px' }}>
          Habitantes
        </Typography>
        {menuType === 'habitantes' && (isOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />)}
      </div>
      {renderMenu('habitantes', habitants)}
    </div>
  );
};

export default Home;