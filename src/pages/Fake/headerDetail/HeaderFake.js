import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WifiIcon from '@mui/icons-material/Wifi';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentIcon from '@mui/icons-material/Payment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarsIcon from '@mui/icons-material/Stars';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiWinkIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const HeaderFake = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: 'Horas Disponibles', icon: <AccessTimeIcon /> },
        { text: 'Mis Horas de Conexión', icon: <WifiIcon /> },
        { text: 'Notificaciones', icon: <NotificationsIcon /> },
        { text: 'Pedidos Recientes', icon: <ReceiptIcon /> },
        { text: 'Billetera', icon: <AccountBalanceWalletIcon /> },
        { text: 'Pagos', icon: <PaymentIcon /> },
        { text: 'Logros', icon: <EmojiEventsIcon /> },
        { text: 'Refiere a un Amigo', icon: <PeopleIcon /> },
        { text: 'Descuentos', icon: <LocalOfferIcon /> },
        { text: 'Rendimiento', icon: <BarChartIcon /> },
        { text: 'Reya Plus', icon: <StarsIcon /> },
        { text: 'Sugerencias sobre la App', icon: <FeedbackIcon /> },
        { text: 'Política de Privacidad', icon: <PrivacyTipIcon /> },
        { text: 'Configuración', icon: <SettingsIcon /> },
    ];

    const list = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            style={{ width: 250 }}
        >
            <List>
                <ListItem>
                    <ListItemIcon><EmojiWinkIcon style={{ color: '#000' }} /></ListItemIcon>
                    <ListItemText primary="Buen Provecho" />
                </ListItem>
            </List>
            <Divider />
            <List>
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.text}>
                        <ListItem button>
                            <ListItemIcon style={{ color: '#000' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                        {index === 1 || index === 2 || index === 9 || index === 11 || index === 13 ? <Divider /> : null}
                    </React.Fragment>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <AppBar position="static" style={{ backgroundColor: '#fff', boxShadow: '0px 8px 15px -2px rgb(224, 224, 224)' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
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
                    <IconButton edge="end" color="inherit" aria-label="customer-service">
                        <HeadsetMicIcon style={{ color: 'red', fontSize: '1.5rem' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </Drawer>
        </>
    );
};

export default HeaderFake;

