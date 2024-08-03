import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

const HeaderFake = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#fff', boxShadow: '0px 8px 15px -2px rgb(224, 224, 224)',}}>
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
    );
};

export default HeaderFake;
