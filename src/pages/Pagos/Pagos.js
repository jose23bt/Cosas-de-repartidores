import React, { useState } from 'react';
import './Pagos.css';

const EarningsCalculator = () => {
  // Estado para manejar las entradas del usuario
  const [hoursDay, setHoursDay] = useState(0);
  const [deliveriesDay, setDeliveriesDay] = useState(0);
  const [hoursNight, setHoursNight] = useState(0);
  const [deliveriesNight, setDeliveriesNight] = useState(0);
  const [kmToPickup, setKmToPickup] = useState(0);
  const [kmToDelivery, setKmToDelivery] = useState(0);
  const [group, setGroup] = useState(1);
  const [dayType, setDayType] = useState('weekday');
  const [simulateTips, setSimulateTips] = useState(false);
  const [tips, setTips] = useState(0);

  // Tarifas básicas según el día y la noche
  const rates = {
    weekdayDay: { pickup: 360, delivery: 170 },
    weekdayNight: { pickup: 460, delivery: 240 },
    weekendNight: { pickup: 670, delivery: 370 },
    weekendDay: { pickup: 400, delivery: 240 },
  };

  // Tarifas por kilómetro
  const kmRates = {
    toPickup: [
      { maxKm: 1.5, rate: 120 },
      { maxKm: 2.5, rate: 150 },
      { maxKm: 4, rate: 185 },
      { maxKm: Infinity, rate: 255 },
    ],
    toDelivery: [
      { maxKm: 1.5, rate: 135 },
      { maxKm: 2.5, rate: 165 },
      { maxKm: 4, rate: 200 },
      { maxKm: Infinity, rate: 270 },
    ],
  };

  // Tarifas de grupo
  const groupRates = {
    1: { delivery: 150, km: 25 },
    2: { delivery: 100, km: 20 },
    3: { delivery: 70, km: 12 },
    4: { delivery: 40, km: 8 },
  };

  // Función para obtener la tarifa según los kilómetros
  const getRate = (km, rates) => {
    for (let rate of rates) {
      if (km <= rate.maxKm) {
        return rate.rate;
      }
    }
    return 0;
  };

  // Función para calcular las ganancias diurnas
  const calculateDayEarnings = () => {
    const dayKey = dayType === 'weekend' ? 'weekend' : 'weekday';
    const dayRates = rates[dayKey + 'Day'];

    const avgKmToPickup = kmToPickup / deliveriesDay;
    const avgKmToDelivery = kmToDelivery / deliveriesDay;

    const kmToPickupRate = getRate(avgKmToPickup, kmRates.toPickup);
    const kmToDeliveryRate = getRate(avgKmToDelivery, kmRates.toDelivery);

    const baseEarnings = (
      dayRates.pickup * deliveriesDay +
      dayRates.delivery * deliveriesDay +
      kmToPickupRate * deliveriesDay +
      kmToDeliveryRate * deliveriesDay +
      hoursDay * 15 // Añadido por publicidad
    );

    const groupRate = groupRates[group];
    const groupEarnings = (
      groupRate.delivery * deliveriesDay +
      groupRate.km * (avgKmToPickup + avgKmToDelivery) * deliveriesDay
    );

    return {
      baseEarnings: baseEarnings.toFixed(2),
      groupEarnings: groupEarnings.toFixed(2),
      totalEarnings: (baseEarnings + groupEarnings).toFixed(2),
    };
  };

  // Función para calcular las ganancias nocturnas
  const calculateNightEarnings = () => {
    const nightKey = dayType === 'weekend' ? 'weekend' : 'weekday';
    const nightRates = rates[nightKey + 'Night'];

    const avgKmToPickup = kmToPickup / deliveriesNight;
    const avgKmToDelivery = kmToDelivery / deliveriesNight;

    const kmToPickupRate = getRate(avgKmToPickup, kmRates.toPickup);
    const kmToDeliveryRate = getRate(avgKmToDelivery, kmRates.toDelivery);

    const baseEarnings = (
      nightRates.pickup * deliveriesNight +
      nightRates.delivery * deliveriesNight +
      kmToPickupRate * deliveriesNight +
      kmToDeliveryRate * deliveriesNight +
      hoursNight * 15 // Añadido por publicidad
    );

    const groupRate = groupRates[group];
    const groupEarnings = (
      groupRate.delivery * deliveriesNight +
      groupRate.km * (avgKmToPickup + avgKmToDelivery) * deliveriesNight
    );

    return {
      baseEarnings: baseEarnings.toFixed(2),
      groupEarnings: groupEarnings.toFixed(2),
      totalEarnings: (baseEarnings + groupEarnings).toFixed(2),
    };
  };

  // Función para manejar cambios en las horas trabajadas
  const handleHoursChange = (setter, value, otherValue) => {
    const totalHours = parseInt(value) + parseInt(otherValue);
    if (totalHours <= 12) {
      setter(value);
    } else {
      alert('No puedes trabajar más de 12 horas en total.');
    }
  };

  // Función para manejar cambios en los rangos
  const handleRangeChange = (setter, value) => {
    setter(value);
  };

  // Función para generar propinas aleatorias
  const generateTips = () => {
    const totalDeliveries = parseInt(deliveriesDay) + parseInt(deliveriesNight);
    let totalTips = 0;
    for (let i = 0; i < totalDeliveries; i++) {
      const tip = Math.floor(Math.random() * 220) + 10; // Genera propinas entre 50 y 1500
      totalTips += tip;
    }
    setTips(totalTips);
  };

  // Calcular las ganancias diurnas y nocturnas
  const dayEarnings = calculateDayEarnings();
  const nightEarnings = calculateNightEarnings();

  // Calcular las ganancias totales
  const totalBaseEarnings = (
    parseFloat(dayEarnings.baseEarnings) + parseFloat(nightEarnings.baseEarnings)
  ).toFixed(2);
  const totalGroupEarnings = (
    parseFloat(dayEarnings.groupEarnings) + parseFloat(nightEarnings.groupEarnings)
  ).toFixed(2);
  const totalEarnings = (
    parseFloat(dayEarnings.totalEarnings) +
    parseFloat(nightEarnings.totalEarnings) +
    (simulateTips ? tips : 0)
  ).toFixed(2);
  
  return (
    <div className="calculator-container">
      <h2>Calculadora de Ganancias</h2>
      <div className="calculator-content">
        <div className="options-container card">
          <div className="input-group horizontal-group">
            <label>Día:</label>
            <select value={dayType} onChange={e => setDayType(e.target.value)}>
              <option value="weekday">Lunes a Viernes</option>
              <option value="weekend">Sábado y Domingo</option>
            </select>
            <label>Grupo:</label>
            <select value={group} onChange={e => setGroup(e.target.value)}>
              <option value={1}>Grupo 1</option>
              <option value={2}>Grupo 2</option>
              <option value={3}>Grupo 3</option>
              <option value={4}>Grupo 4</option>
            </select>
          </div>
          <div className="input-group">
            <label>Horas trabajadas de 7:00 a 20:00:</label>
            <input
              type="range"
              min="0"
              max="12"
              step="1"
              value={hoursDay}
              onChange={e => handleHoursChange(setHoursDay, e.target.value, hoursNight)}
            />
          </div>
            <span>{hoursDay} horas</span>
          <div className="input-group">
            <label>Pedidos entregados de 7:00 a 20:00:</label>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={deliveriesDay}
              onChange={e => handleRangeChange(setDeliveriesDay, e.target.value)}
            />
          </div>
            <span>{deliveriesDay} pedidos</span>
          <div className="input-group">
            <label>Horas trabajadas de 20:00 a 00:00:</label>
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={hoursNight}
              onChange={e => handleHoursChange(setHoursNight, e.target.value, hoursDay)}
            />
          </div>
            <span>{hoursNight} horas</span>
          <div className="input-group">
            <label>Pedidos entregados de 20:00 a 00:00:</label>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={deliveriesNight}
              onChange={e => handleRangeChange(setDeliveriesNight, e.target.value)}
            />
          </div>
            <span>{deliveriesNight} pedidos</span>
          <div className="input-group">
            <label>Kilómetros al punto de retiro:</label>
            <input
              type="range"
              min="0"
              max="60"
              step="0.1"
              value={kmToPickup}
              onChange={e => handleRangeChange(setKmToPickup, e.target.value)}
            />
          </div>
            <span>{kmToPickup} km</span>
          <div className="input-group">
            <label>Kilómetros al punto de entrega:</label>
            <input
              type="range"
              min="0"
              max="60"
              step="0.1"
              value={kmToDelivery}
              onChange={e => handleRangeChange(setKmToDelivery, e.target.value)}
            />
          </div>
            <span>{kmToDelivery} km</span>
          <div className="input-group">
            <label>Simular Propinas:</label>
            <input type="checkbox" checked={simulateTips} onChange={e => setSimulateTips(e.target.checked)} />
            {simulateTips && <button onClick={generateTips}>Generar Propinas</button>}
          </div>
        </div>
        <div className="earnings">
        <div className="earnings-section">
          <h3>Ganancias Día:</h3>
          <div className="earnings-detail">
            <p>Ganancia Base: ${dayEarnings.baseEarnings}</p>
            <p>Adicional por Grupo: ${dayEarnings.groupEarnings}</p>
            <p>Ganancia Total: ${dayEarnings.totalEarnings}</p>
          </div>
          <hr />
          <h3>Ganancias Noche:</h3>
          <div className="earnings-detail">
            <p>Ganancia Base: ${nightEarnings.baseEarnings}</p>
            <p>Adicional por Grupo: ${nightEarnings.groupEarnings}</p>
            <p>Ganancia Total: ${nightEarnings.totalEarnings}</p>
          </div>
          <hr />
          <h3>Ganancia Total:</h3>
          <div className="earnings-detail">
            <p>Ganancia Base: ${totalBaseEarnings}</p>
            <p>Adicional por Grupo: ${totalGroupEarnings}</p>
            <p>Propinas: ${tips}</p>
            <p>Ganancia Total: ${totalEarnings}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EarningsCalculator;
