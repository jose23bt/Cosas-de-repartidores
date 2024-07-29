import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import './LoanPage.css';

function LoanPage() {
    const [amount, setAmount] = useState(0);
    const [term, setTerm] = useState(1);
    const [paymentFrequency, setPaymentFrequency] = useState('weekly');
    const [total, setTotal] = useState(0);
    const [weeklyPayment, setWeeklyPayment] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const navigate = useNavigate();

    // Define the fixed interest rates
    const weeklyInterestRate = 0.05;
    const monthlyInterestRate = 0.15;

    // Calculate total amounts and payments
    useEffect(() => {
        const calculateTotal = () => {
            const interestRate = paymentFrequency === 'weekly' ? weeklyInterestRate : monthlyInterestRate;
            const totalAmount = amount * (1 + interestRate * term);
            const totalInterest = totalAmount - amount;
            const weeklyPayment = paymentFrequency === 'weekly' ? totalAmount / term : 0;
            const monthlyPayment = paymentFrequency === 'monthly' ? totalAmount / term : 0;

            setTotal(totalAmount);
            setWeeklyPayment(weeklyPayment);
            setMonthlyPayment(monthlyPayment);
            setTotalInterest(totalInterest);
        };

        calculateTotal();
    }, [amount, term, paymentFrequency]);

    // Handle the loan request
    const handleRequestLoan = () => {
        navigate('/checkout', {
            state: {
                amount,
                term,
                paymentFrequency,
                total,
                interestRate: paymentFrequency === 'weekly' ? weeklyInterestRate : monthlyInterestRate,
                weeklyPayment,
                monthlyPayment,
                totalInterest
            }
        });
    };

    // Format currency values
    const formatCurrency = (value) => {
        return value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    };

    return (
        <div className="loan-page">
            <h1 className="title">Simulador de Adelantos</h1>
            <div className="card">
                <div className="input-section">
                    <div className="input-group">
                        <label htmlFor="amount">Monto del Adelanto</label>
                        <NumericFormat
                            id="amount"
                            value={amount}
                            displayType={'input'}
                            thousandSeparator={true}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            prefix={'$'}
                            onValueChange={(values) => {
                                const { floatValue } = values;
                                setAmount(floatValue || 0);
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="term">Cuotas:</label>
                        <div className="options-group">
                            {(paymentFrequency === 'weekly' ? [1, 2, 3, 4] : [1, 2, 3]).map(num => (
                                <label key={num}>
                                    <input
                                        type="radio"
                                        name="term"
                                        value={num}
                                        checked={term === num}
                                        onChange={() => setTerm(num)}
                                    />
                                    {num}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="paymentFrequency">Frecuencia de Pago</label>
                        <select
                            id="paymentFrequency"
                            value={paymentFrequency}
                            onChange={(e) => {
                                setPaymentFrequency(e.target.value);
                                setTerm(1);
                            }}
                        >
                            <option value="weekly">Semanal</option>
                            <option value="monthly">Mensual</option>
                        </select>
                    </div>
                </div>
                <div className="result-box">
                    <h2>Desglose del adelanto</h2>
                    <p><strong>Monto Solicitado:</strong> {formatCurrency(amount)}</p>
                    <p><strong>Cuotas {paymentFrequency === 'weekly' ? 'Semanales' : 'Mensuales'}:</strong> {paymentFrequency === 'weekly' ? formatCurrency(weeklyPayment) : formatCurrency(monthlyPayment)}</p>
                    <p><strong>Interés Total ({paymentFrequency === 'weekly' ? '5%' : '15%'}):</strong> {formatCurrency(totalInterest)}</p>
                    <p><strong>Total a Pagar:</strong> {formatCurrency(total)}</p>
                    <button onClick={handleRequestLoan}>Solicitar Adelanto</button>
                </div>
            </div>
        </div>
    );
}

export default LoanPage;


