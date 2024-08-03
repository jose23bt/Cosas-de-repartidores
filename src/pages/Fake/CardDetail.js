import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Divider, Button } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import MoodIcon from '@mui/icons-material/Mood';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const CardDetail = ({ handleOrderDetailNumberChange, handleCustomerNameChange, handleItemChange }) => {
    const [orderDetailNumber, setOrderDetailNumber] = useState('1230990404 (#4942)');
    const [customerName, setCustomerName] = useState("Simon D'Amico");
    const [items] = useState([{ name: ' 1   Hamburguesa', price: '13,900.00' }]); // Elemento predeterminado
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card className="card-detail" sx={{ backgroundColor: 'white', borderRadius: 6, padding: 0, boxShadow: 3 }}>
            <CardContent className="card-detail-content">
                <Typography sx={{ fontSize: 10, fontWeight: 'medium', marginBottom: 1 }}>
                    Detalles de la orden
                </Typography>
                <Box sx={{ marginBottom: 1 }}>
                    <input
                        type="text"
                        value={orderDetailNumber}
                        onChange={(e) => {
                            setOrderDetailNumber(e.target.value);
                            handleOrderDetailNumberChange(e);
                        }}
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            border: 'none',
                            borderBottom: '0px solid #ccc',
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    />
                </Box>

                <Box sx={{ marginBottom: 3 }}>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => {
                            setCustomerName(e.target.value);
                            handleCustomerNameChange(e);
                        }}
                        style={{
                            fontSize: 14,
                            border: 'none',
                            borderBottom: '0px solid #ccc',
                            borderRadius: 4,
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    />
                </Box>

                <Box className="card-detail-field">
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'darkgreen',
                            color: 'white',
                            borderRadius: 8,
                            padding: 1,
                            height: '28px',
                        }}
                    >
                        <ShoppingBagIcon style={{ fontSize: 14, marginRight: 6 }} />
                        <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>Listo</Typography>
                    </Box>
                </Box>

                <Box className="card-detail-field">
                    <Button
                        onClick={toggleExpand}
                        style={{ color: 'red', marginBottom: 5, display: 'flex', alignItems: 'center' }}
                    >
                        <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
                            {isExpanded ? `Esconder los elementos del pedido (${items.length})` : `Ver elementos del pedido (${items.length})`}
                        </Typography>
                        {isExpanded ? (
                            <ExpandLessIcon style={{ color: 'red', marginLeft: 8 }} />
                        ) : (
                            <ExpandMoreIcon style={{ color: 'red', marginLeft: 8 }} />
                        )}
                    </Button>
                    {isExpanded && (
                        <div>
                            {items.map((item, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                                    <input
                                        type="text"
                                        value={item.name || ''}
                                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                        style={{ width: 'calc(50% - 5px)', border: 'none', borderBottom: '0px solid #ccc' }}
                                    />
                                    <input
                                        type="text"
                                        value={item.price || ''}
                                        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                        style={{ width: 'calc(50% - 5px)', border: 'none', borderBottom: '0px solid #ccc' }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <Divider style={{ marginTop: 15 }} />
                    <Typography sx={{ fontSize: 10, fontWeight: 'medium', marginBottom: 1, marginTop: 2 }}>Pago</Typography>
                    <Typography>No pagar en el local</Typography>
                </Box>
                <Divider style={{ marginTop: 15, marginBottom: 15 }} />

                <Box className="card-detail-field">
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid lightgray', // Borde gris de 1 px                            
                            padding: 10, // Espacio interior
                            borderRadius: 12, // Bordes redondeados opcional
                        }}
                    >
                        <Typography style={{ marginBottom: 15, textAlign: 'center' }}>
                            ¿Cómo es la experiencia de retiro?
                        </Typography>
                        <Box style={{ display: 'flex', gap: 2 }}>
                            <MoodBadIcon style={{ color: 'gray', fontSize: 50 }} />
                            <MoodIcon style={{ color: 'gray', fontSize: 50 }} />
                        </Box>
                    </Box>
                </Box>

            </CardContent>
        </Card>
    );
};

export default CardDetail;
