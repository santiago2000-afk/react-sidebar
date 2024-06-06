import React, { useState } from 'react';
import { Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material'; 

const Dropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuType, setMenuType] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, type: string) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
    setMenuType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const renderMenuItem = (items: { name: string; description: string; imgSrc: string }[]) =>
    items.map((item, index) => (
      <MenuItem key={index} onClick={handleClose} style={{ width: '400px' }}>
        <Avatar alt={`Foto ${index + 1}`} src={item.imgSrc} sx={{ width: 64, height: 64, marginRight: 2 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="subtitle1">{item.name}</Typography>
          <Typography variant="body2" color="textSecondary">{item.description}</Typography>
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
      {renderMenu('entradas', [
        { name: "Nombre 1", description: "Descripción 1", imgSrc: "foto1.jpg" },
        { name: "Nombre 2", description: "Descripción 2", imgSrc: "foto2.jpg" },
        { name: "Nombre 3", description: "Descripción 3", imgSrc: "foto3.jpg" }
      ])}
      
      <div onClick={(event) => handleClick(event, 'recursos')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #ccc' }}>
        <Typography variant="body1" style={{ marginRight: '8px' }}>
          Habitantes
        </Typography>
        {menuType === 'recursos' && (isOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />)}
      </div>
      {renderMenu('recursos', [
        { name: "Recurso 1", description: "Descripción 1", imgSrc: "foto4.jpg" },
        { name: "Recurso 2", description: "Descripción 2", imgSrc: "foto5.jpg" },
        { name: "Recurso 3", description: "Descripción 3", imgSrc: "foto6.jpg" }
      ])}
    </div>
  );
};

export default Dropdown;