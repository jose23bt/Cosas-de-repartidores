import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Divider, Button, Modal } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import MoodIcon from '@mui/icons-material/Mood';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './CardDetail.css'; // Asegúrate de importar el archivo CSS

const CardDetail = ({ handleOrderDetailNumberChange }) => {
    const [orderDetailNumber, setOrderDetailNumber] = useState('1230990404 (#4942)');
    const [customerName, setCustomerName] = useState("Simon D'Amico");
    const [items, setItems] = useState([{ name: '1 Hamburguesa', price: '13,900.00' }]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate(); // Inicializa useNavigate

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmRetiro = () => {
        // Lógica para confirmar el retiro
        setModalOpen(false);
        // Navega al componente fakefrontend
        navigate('/fakefrontend');
    };

    return (
        <>
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
                                if (handleOrderDetailNumberChange) {
                                    try {
                                        handleOrderDetailNumberChange(e);
                                    } catch (error) {
                                        console.error('Error en handleOrderDetailNumberChange:', error);
                                    }
                                }
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
                            onChange={(e) => setCustomerName(e.target.value)}
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
                                            value={item.name}
                                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                            style={{ width: 'calc(50% - 5px)', border: 'none', borderBottom: '0px solid #ccc' }}
                                        />
                                        <input
                                            type="text"
                                            value={item.price}
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
                                border: '1px solid lightgray',
                                padding: 10,
                                borderRadius: 12,
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

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginBottom: 10,
                mt: 2
            }}>
                <Button
                    className="card-detail-button"
                    variant="contained"
                    color="error"
                    onClick={handleOpenModal}
                >
                    Confirmar Retiro
                </Button>
            </Box>

            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'white',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 365,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        ¿Confirmas que retiraste el pedido {orderDetailNumber}?
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ textTransform: 'none', mb: 2, width: '100%' }}
                        onClick={handleConfirmRetiro}
                    >
                        Confirmar Retiro
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            textTransform: 'none',
                            borderColor: 'transparent',
                            color: 'red',
                            width: '100%',
                        }}
                        onClick={handleCloseModal}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default CardDetail;
