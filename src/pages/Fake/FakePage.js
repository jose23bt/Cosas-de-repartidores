import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Card, CardContent, TextField, Button, Divider, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import MoodIcon from '@mui/icons-material/Mood';
import './Fake.css';

const Fake = () => {
  const [selected, setSelected] = useState(false);
  const [orderNumber, setOrderNumber] = useState('#4938');
  const [storeName, setStoreName] = useState('Nombre del Local');
  const [orderDetailNumber, setOrderDetailNumber] = useState(''); // Añadido
  const [customerName, setCustomerName] = useState(''); // Añadido
  const [items, setItems] = useState([]); // Añadido

  const handleSelect = () => {
    setSelected(!selected);
  };

  const handleStoreNameChange = (event) => {
    setStoreName(event.target.value);
  };

  const handleOrderDetailNumberChange = (event) => { // Añadido
    setOrderDetailNumber(event.target.value);
  };

  const handleCustomerNameChange = (event) => { // Añadido
    setCustomerName(event.target.value);
  };

  const handleItemChange = (index, field, value) => { // Añadido
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#fff', boxShadow: '0px 4px 2px -2px gray', zIndex: -1200 }}>
        <Toolbar>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon style={{ color: 'red', fontSize: '1.8rem' }} />
          </IconButton>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              textAlign: 'center',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Punto de Retiro
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="customer-service">
            <HeadsetMicIcon style={{ color: 'red', fontSize: '1.5rem' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div
        className={`order-bar ${selected ? 'selected' : ''}`}
        onClick={handleSelect}
      >
        <div className="order-bar-content">
          <div className="order-bar-top">
            <input
              type="text"
              value={storeName}
              onChange={handleStoreNameChange}
              className="order-bar-store"
              placeholder="Nombre del Local"
            />
            <div className="order-bar-icons">
              <IconButton color="inherit" aria-label="more-options">
                <MoreHorizIcon style={{ color: 'red' }} />
              </IconButton>
              <IconButton color="inherit" aria-label="map">
                <MapOutlinedIcon style={{ color: 'red' }} />
              </IconButton>
            </div>
          </div>
          <div
            className={`order-bar-number ${selected ? 'selected' : ''}`}
            onInput={(e) => setOrderNumber(e.currentTarget.textContent || '')}
            contentEditable
            suppressContentEditableWarning
          >
            {orderNumber}
          </div>
        </div>
      </div>
      {/* Tarjeta de detalle de orden */}
      <Card className="card-detail">
  <CardContent className="card-detail-content">
    <Typography variant="h6" component="div" className="card-detail-title">
      Detalle de la Orden
    </Typography>

    <Box className="card-detail-field">
      <Typography>Numero de Orden</Typography>
      <TextField
        variant="outlined"
        value={orderDetailNumber}
        onChange={handleOrderDetailNumberChange}
        style={{ width: '100%', borderRadius: 2, marginTop: 1 }}
      />
    </Box>

    <Box className="card-detail-field">
      <Typography>Nombre del Cliente</Typography>
      <TextField
        variant="outlined"
        value={customerName}
        onChange={handleCustomerNameChange}
        style={{ width: '100%', borderRadius: 2, marginTop: 1 }}
      />
    </Box>

    <Box className="card-detail-field">
      <Typography>Estado</Typography>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'darkgreen',
          color: 'white',
          borderRadius: 2,
          padding: 1
        }}
      >
        <ShoppingBagIcon style={{ marginRight: 1 }} />
        <Typography>Listo</Typography>
      </Box>
    </Box>

    <Box className="card-detail-field">
      <Typography>Elementos del Pedido</Typography>
      {items.map((item, index) => (
        <Box key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
          <TextField
            variant="outlined"
            value={item.name || ''}
            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
            style={{ width: 'calc(50% - 5px)', borderRadius: 2 }}
          />
          <TextField
            variant="outlined"
            value={item.price || ''}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
            style={{ width: 'calc(50% - 5px)', borderRadius: 2 }}
          />
        </Box>
      ))}
      <Divider style={{ marginY: 2 }} />
      <Typography>Pago</Typography>
      <Typography>No pagar en el local</Typography>
    </Box>

    <Box className="card-detail-field">
      <Typography>¿Cómo es la experiencia de retiro?</Typography>
      <Box style={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton>
          <MoodBadIcon style={{ color: 'gray' }} />
        </IconButton>
        <IconButton>
          <MoodIcon style={{ color: 'gray' }} />
        </IconButton>
      </Box>
    </Box>
  </CardContent>
</Card>
  <Button
    variant="contained"
    color="error"
    className="card-detail-button"
  >
    Confirmar Retiro
  </Button>
    </div>
  );
};

export default Fake;



