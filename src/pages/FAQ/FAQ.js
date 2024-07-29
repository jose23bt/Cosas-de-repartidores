import React, { useState } from 'react';
import './FAQ.css'; // Asegúrate de tener el archivo CSS

const FAQ = () => {
    const [showFactureDetails, setShowFactureDetails] = useState(false);
    const [showLocalList, setShowLocalList] = useState(false);

    const handleFactureToggle = () => {
        setShowFactureDetails(!showFactureDetails);
    };

    const handleLocalListToggle = () => {
        setShowLocalList(!showLocalList);
    };

    return (
        <div className="faq-container">
            <h1>Preguntas Frecuentes</h1>

            <div className="faq-item">
                <h2>¿Cómo facturar?</h2>
                <button onClick={handleFactureToggle}>
                    {showFactureDetails ? 'Ocultar detalles' : 'Mostrar detalles'}
                </button>
                {showFactureDetails && (
                    <div className="facture-details">
                        <p>Para facturar, debes seguir los siguientes pasos:</p>
                        <ol>
                            <li>Inicia sesión en la plataforma.</li>
                            <li>Ve a la sección de facturación.</li>
                            <li>Selecciona el periodo de facturación.</li>
                            <li>Genera y descarga tu factura en formato PDF.</li>
                        </ol>
                    </div>
                )}
            </div>

            <div className="faq-item">
                <h2>¿Qué locales devuelven dinero?</h2>
                <button onClick={handleLocalListToggle}>
                    {showLocalList ? 'Ocultar lista' : 'Mostrar lista'}
                </button>
                {showLocalList && (
                    <div className="local-list">
                        <h3>Locales que devuelven dinero:</h3>
                        <ul>
                            <li>Local A</li>
                            <li>Local B</li>
                            <li>Local C</li>
                        </ul>
                        <h3>Locales que no devuelven dinero:</h3>
                        <ul>
                            <li>Local X</li>
                            <li>Local Y</li>
                            <li>Local Z</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQ;
