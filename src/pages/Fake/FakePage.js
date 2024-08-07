import React, { useState } from 'react';
import { Button, Box, IconButton,} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import HeaderFake from './HeaderFake'; // Importa el componente HeaderFake
import './Fake.css';
import CardDetail from './CardDetail';

const Fake = () => {
  const [selected, setSelected] = useState(false);  
  const [storeName, setStoreName] = useState('');

  const handleSelect = () => {
    setSelected(!selected);
  };

  const handleStoreNameChange = (event) => {
    setStoreName(event.target.value);  };



  return (
    <div>
      <HeaderFake /> 
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
        </div>
      </div>
      {/*card main*/}
      <Box className="CardMain">
        <CardDetail />
      <div className="card-detail-button-container">
        <Button
          variant="contained"
          color="error"
          className="card-detail-button"
        >
          Confirmar Retiro
        </Button>
      </div>
      </Box>
    </div>
  );
};

export default Fake;




