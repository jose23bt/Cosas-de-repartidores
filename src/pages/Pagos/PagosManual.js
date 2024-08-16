import React, { useState } from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa'; // Asegúrate de instalar react-icons si no lo tienes
import './PagosManual.css'; // Asegúrate de importar el CSS

const DeliveryCalculator = () => {
  const [settings, setSettings] = useState({
    shiftTime: '',
    group: 1,
    randomTripsCount: 1,
  });

  const [trip, setTrip] = useState({
    distancePickup: 0,
    distanceDelivery: 0,
    tip: 0,
  });

  const [trips, setTrips] = useState([]);
  const [workingHours, setWorkingHours] = useState(0);
  const [showRandomTrips, setShowRandomTrips] = useState(false);
  const [showAddTripForm, setShowAddTripForm] = useState(false);
  const [showTripsList, setShowTripsList] = useState(false); // Nuevo estado para controlar la visibilidad de la lista de viajes

  const handleSettingsChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleTripChange = (e) => {
    setTrip({ ...trip, [e.target.name]: Math.max(0, parseFloat(e.target.value)) });
  };

  const handleWorkingHoursChange = (e) => {
    setWorkingHours(Math.max(0, Math.min(12, parseFloat(e.target.value))));
  };

  const addTrip = () => {
    const tripEarnings = calculateTripEarnings(trip);
    setTrips([...trips, { ...trip, earnings: tripEarnings }]);
    setTrip({
      distancePickup: 0,
      distanceDelivery: 0,
      tip: 0,
    });
    setShowAddTripForm(false); // Ocultar el formulario después de agregar el viaje
  };

  const generateRandomTrips = () => {
    const newTrips = [];
    for (let i = 0; i < settings.randomTripsCount; i++) {
      const distancePickup = (Math.random() * (6 - 0.1) + 0.1).toFixed(1);
      const distanceDelivery = (Math.random() * (6 - 0.1) + 0.1).toFixed(1);

      let tip;
      const rand = Math.random();
      if (rand < 0.75) {
        tip = Math.floor(Math.random() * 51) * 5; // Genera valores entre 0 y 250 (múltiplos de 5)
      } else if (rand < 0.85) {
        tip = Math.floor(Math.random() * 41) * 5 + 300; // Genera valores entre 300 y 500 (múltiplos de 5)
      } else {
        tip = Math.floor(Math.random() * 101) * 5 + 500; // Genera valores entre 500 y 1000 (múltiplos de 5)
      }

      // Establece propinas menores a 20 como 0
      tip = tip < 20 ? 0 : tip;

      newTrips.push({
        distancePickup: parseFloat(distancePickup),
        distanceDelivery: parseFloat(distanceDelivery),
        tip: parseFloat(tip),
      });
    }
    setTrips([
      ...trips,
      ...newTrips.map((trip) => ({
        ...trip,
        earnings: calculateTripEarnings(trip),
      })),
    ]);
    setShowRandomTrips(true); // Mostrar la lista de viajes generados

    // Reiniciar los inputs después de generar los viajes
    setSettings({
      shiftTime: '',
      group: 1,
      randomTripsCount: 1,
    });
  };

  const removeTrip = (index) => {
    setTrips(trips.filter((_, i) => i !== index));
  };

  const removeAllTrips = () => {
    setTrips([]);
  };

  const calculateTripEarnings = (trip) => {
    let pickupFee = 0;
    let deliveryFee = 0;
  
    // Cálculo según el turno y horario
    switch (settings.shiftTime) {
      case 'Mon-Fri-day':
        pickupFee = 435;
        deliveryFee = 225;
        break;
      case 'Mon-Thu-night':
        pickupFee = 550;
        deliveryFee = 345;
        break;
      case 'Fri-Sun-night':
        pickupFee = 840;
        deliveryFee = 515;
        break;
      case 'Sat-Sun-day':
        pickupFee = 485;
        deliveryFee = 310;
        break;
      default:
        break;
    }
  
    let distancePickupFee = 0;
    let distanceDeliveryFee = 0;
  
    // Tarifas por kilómetro al punto de retiro
    if (trip.distancePickup <= 1.5) distancePickupFee = 130;
    else if (trip.distancePickup <= 2.5) distancePickupFee = 165;
    else if (trip.distancePickup <= 4) distancePickupFee = 210;
    else distancePickupFee = 290;
  
    // Tarifas por kilómetro al punto de entrega
    if (trip.distanceDelivery <= 1.5) distanceDeliveryFee = 145;
    else if (trip.distanceDelivery <= 2.5) distanceDeliveryFee = 180;
    else if (trip.distanceDelivery <= 4) distanceDeliveryFee = 225;
    else distanceDeliveryFee = 315;
  
    const groupAdditions = {
      1: { delivery: 150, distance: 25 },
      2: { delivery: 100, distance: 20 },
      3: { delivery: 70, distance: 12 },
      4: { delivery: 40, distance: 8 },
    };
  
    const groupFee = groupAdditions[settings.group];
  
    return (
      pickupFee +
      deliveryFee +
      distancePickupFee +
      distanceDeliveryFee +
      groupFee.delivery +
      groupFee.distance * trip.distanceDelivery +
      parseFloat(trip.tip)
    ).toFixed(2);
  };

  const calculateTotalEarnings = () => {
    let totalEarnings = trips.reduce((sum, trip) => sum + parseFloat(trip.earnings), 0);
    totalEarnings += workingHours * 15; // Horas de publicidad
    return totalEarnings.toFixed(2);
  };

  const calculateAdditionalEarnings = () => {
    const groupAdditions = {
      1: 150,
      2: 100,
      3: 70,
      4: 40,
    };

    const groupFee = groupAdditions[settings.group];
    const totalAdditionalEarnings = trips.reduce((sum, trip) => sum + groupFee, 0);
    return totalAdditionalEarnings.toFixed(2);
  };

  const calculateTotalTips = () => {
    const totalTips = trips.reduce((sum, trip) => sum + parseFloat(trip.tip), 0);
    return totalTips.toFixed(2);
  };

  const calculateAverageEarningsPerHour = () => {
    if (workingHours === 0) return '0.00';
    const totalEarnings = calculateTotalEarnings();
    const averageEarnings = (totalEarnings / workingHours).toFixed(2);
    return averageEarnings;
  };

  const totalEarnings = calculateTotalEarnings();
  const additionalEarnings = calculateAdditionalEarnings();
  const totalTips = calculateTotalTips();
  const averageEarningsPerHour = calculateAverageEarningsPerHour();

  return (
    <div className="delivery-calculator">
      <h1>Calculadora de Ganancias Manual</h1>
      <div className="form-section">
        <label>
          Turno y Horario:
          <select name="shiftTime" value={settings.shiftTime} onChange={handleSettingsChange}>
            <option value="">Seleccionar</option>
            <option value="Mon-Fri-day">Lunes a Viernes (Día)</option>
            <option value="Mon-Thu-night">Lunes a Jueves (Noche)</option>
            <option value="Fri-Sun-night">Viernes a Domingo (Noche)</option>
            <option value="Sat-Sun-day">Sábado y Domingo (Día)</option>
          </select>
        </label>
        <label>
          Grupo:
          <select name="group" value={settings.group} onChange={handleSettingsChange}>
            <option value={1}>Grupo 1</option>
            <option value={2}>Grupo 2</option>
            <option value={3}>Grupo 3</option>
            <option value={4}>Grupo 4</option>
          </select>
        </label>
        <label>
          Cantidad de Viajes Aleatorios:
          <input
            type="number"
            name="randomTripsCount"
            value={settings.randomTripsCount}
            onChange={handleSettingsChange}
            min="1"
            max="100"
          />
        </label>
        <button onClick={generateRandomTrips}>Generar Viajes Aleatorios</button>
      </div>

      <button className="toggle-form-btn" onClick={() => setShowAddTripForm(!showAddTripForm)}>
        {showAddTripForm ? 'Ocultar Formulario de Viaje' : 'Agregar Viaje'}
      </button>
      {showAddTripForm && (
        <div className="form-section">
          <label>
            Distancia al Punto de Retiro (km):
            <input
              type="number"
              name="distancePickup"
              value={trip.distancePickup}
              onChange={handleTripChange}
              min="0"
              step="0.1"
            />
          </label>
          <label>
            Distancia al Punto de Entrega (km):
            <input
              type="number"
              name="distanceDelivery"
              value={trip.distanceDelivery}
              onChange={handleTripChange}
              min="0"
              step="0.1"
            />
          </label>
          <label>
            Propina:
            <input
              type="number"
              name="tip"
              value={trip.tip}
              onChange={handleTripChange}
              min="0"
              step="0.01"
            />
          </label>
          <button onClick={addTrip}>Agregar Viaje</button>
        </div>
      )}

      <button className="toggle-trips-list-btn" onClick={() => setShowTripsList(!showTripsList)}>
        {showTripsList ? 'Ocultar Lista de Viajes' : 'Mostrar Lista de Viajes'}
      </button>

      {showTripsList && (
        <div className="trips-list">
          <h2>Viajes</h2>
          {trips.length === 0 ? (
            <p>No se han agregado viajes.</p>
          ) : (
            <ul>
              {trips.map((trip, index) => (
                <li key={index} className="trip-item">
                  <span>
                    Retiro: {trip.distancePickup} km, Entrega: {trip.distanceDelivery} km, Propina: ${trip.tip.toFixed(2)}, Ganancias: ${trip.earnings}
                  </span>
                  <button className="remove-trip-btn" onClick={() => removeTrip(index)}>
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button className="remove-all-trips-btn" onClick={removeAllTrips}>
            <FaTrashAlt /> Eliminar Todos los Viajes
          </button>
        </div>
      )}

      <div className="summary">
        <h2>Desglose</h2>
        <label>
          Horas Trabajadas:
          <input
            type="number"
            value={workingHours}
            onChange={handleWorkingHoursChange}
            min="0"
            max="12"
            step="1"
          />
        </label>
        <p>Ganancias Totales: ${totalEarnings}</p>
        <p>Ganancias Adicionales por Grupo: ${additionalEarnings}</p>
        <p>Propinas Totales: ${totalTips}</p>
        <p>Ganancias Promedio por Hora: ${averageEarningsPerHour}</p>
      </div>
    </div>
  );
};

export default DeliveryCalculator;




