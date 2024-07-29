import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CheckoutPage.css';

function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { amount, paymentFrequency, total, interestRate, weeklyPayment, monthlyPayment, totalInterest } = location.state || {};

    const handleBackToSimulator = () => {
        navigate('/loans');
    };

    return (
        <div className="checkout-page">
            <h1>Resumen del Adelanto</h1>
            <div className="checkout-summary">
                <div className="summary-box">
                    <p><strong>Monto Solicitado:</strong> <span className="amount">{amount}</span></p>
                    <p><strong>Cuotas {paymentFrequency === 'weekly' ? 'Semanales' : 'Mensuales'}:</strong> <span className="amount">{paymentFrequency === 'weekly' ? weeklyPayment : monthlyPayment}</span></p>
                    <p><strong>Interés ({(interestRate * 100).toFixed(0)}%):</strong> <span className="amount">{totalInterest}</span></p>
                    <p><strong>Total a Pagar:</strong> <span className="amount">{total}</span></p>
                </div>
                <button className="checkout-button">Solicitar adelanto</button>
                <button className="back-button" onClick={handleBackToSimulator}>Volver a la Simulación</button>
            </div>
        </div>
    );
}

export default CheckoutPage;
