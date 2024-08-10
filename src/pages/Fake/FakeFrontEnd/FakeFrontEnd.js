import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './FakeFrontEnd.css';
import L from 'leaflet';
import MenuIcon from '@mui/icons-material/Menu';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import RefreshIcon from '@mui/icons-material/Refresh';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneIcon from '@mui/icons-material/Phone';
import Divider from '@mui/material/Divider';


const FakeFrontEnd = () => {
    const [position, setPosition] = useState(null);
    const [heading, setHeading] = useState(0);
    const [cardExpanded, setCardExpanded] = useState(false);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude, longitude, heading } = pos.coords;
                setPosition([latitude, longitude]);
                if (heading !== null) {
                    setHeading(heading);
                }
            },
            (err) => console.error(err),
            { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const RecenterMap = () => {
        const map = useMap();

        useEffect(() => {
            if (position) {
                map.setView(position);
            }
        }, [map]);

        return null;
    };

    const createCustomIcon = () => {
        const iconHTML = `
            <div style="position: relative;">
                <div style="
                    width: 15px;
                    height: 15px;
                    background-color: blue;
                    border-radius: 50%;
                    position: absolute;
                    top: -7.5px;
                    left: -7.5px;
                "></div>
                <div style="
                    width: 30px;
                    height: 50px;
                    position: absolute;
                    top: -50px;
                    left: -15px;
                    background: linear-gradient(0deg, rgba(0,0,255,0.5), transparent);
                    transform: rotate(${heading}deg);
                    transform-origin: center;
                "></div>
            </div>
        `;
        return L.divIcon({
            className: 'custom-marker-icon',
            html: iconHTML,
        });
    };

    const handleCardToggle = () => {
        setCardExpanded(!cardExpanded);
    };

    return (
        <div className="map-container">
            {position ? (
                <MapContainer center={position} zoom={15} zoomControl={false} className="leaflet-container">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RecenterMap />
                    <Marker position={position} icon={createCustomIcon()} />
                </MapContainer>
            ) : (
                <div>Loading...</div>
            )}
            <button className="menu-button">
                <MenuIcon style={{ color: 'red' }} />
            </button>
            <div className="status-button">
                <span className="status-dot"></span>
                <div>
                    <small>Estado</small>
                    <br />
                    Repartiendo
                </div>
            </div>
            <button className="headphones-button">
                <HeadphonesIcon style={{ color: 'red' }} />
            </button>
            <button className="refresh-button">
                <RefreshIcon style={{ color: 'red' }} />
            </button>
            <button className="location-button">
                <MyLocationIcon style={{ color: 'red' }} />
            </button>
            <button className="navigate-button">
                <DirectionsIcon style={{ color: 'white' }} />
                <span style={{ color: 'white', marginLeft: '8px' }}>Navegar</span>
            </button>
            {/* Card Expandible */}
<div className={`card ${cardExpanded ? 'expanded' : ''}`}>
    <div className="card-header" onClick={handleCardToggle}>
        <div className="expand-line"></div>
    </div>
    <div className="card-content">
        <div className='flex-card'>
            <div className="user-info">
                <div className="client-info">
                    <div className="client-name">Nombre Usuario</div>
                    <div className="info-texts">
                        <span>Ir a la dirección del cliente</span>
                        <span>Llegada en 15 min...</span>
                    </div>
                </div>
            </div>
            <aside className="phone-aside">
                <button className="phone-button">
                    <PhoneIcon style={{ color: 'red' }} />
                </button>
            </aside>
        </div>
        <Divider />
        {cardExpanded && (
            <div className="additional-info">
                {/* Información adicional aquí */}
                <p>Detalles de la dirección y otras indicaciones...</p>
            </div>
        )}
        <button className="continue-button">
            Continuar con la entrega
        </button>
    </div>
</div>


        </div>
    );
};

export default FakeFrontEnd;
