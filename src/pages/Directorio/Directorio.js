import React from 'react';
import './Directorio.css';

const DirectoryItem = ({ category, contacts }) => (
  <div className="directory-card">
    <details>
      <summary>{category}</summary>
      {contacts.map((contact, index) => (
        <div key={index} className="directory-contact-card">
          <h3>{contact.name}</h3>
          <p><strong>Dirección:</strong> {contact.address}</p>
          <p><strong>Teléfono:</strong> {contact.phone}</p>
          <p><strong>Nivel Económico:</strong> {'$'.repeat(contact.economicLevel)}</p>
          <p><strong>Historial:</strong> {contact.history}</p>
          <p><strong>Referencias:</strong> {contact.references}</p>
        </div>
      ))}
    </details>
  </div>
);

const Directorio = () => {
  const categories = {
    'Abogados': [

    ],
    'Mecánicos': [
        {
            name: 'Edu',
            address: 'Vélez Sársfield 2437, lanus',
            phone: '11 5623-5039',
            economicLevel: 4, // Nivel económico del 1 al 10, se representará con 6 símbolos de $
            history: 'Todos hemos ido ahi, hace la chamba, te atiende bien pero ojo que puede fallar o robar jaja nahhh mentira pero pilas (no hace presupuestos si te chocan)',
            references: 'Su primer cliente, el samu. luego daniel se sintio celoso y lo desplazo y ahora es su amante y fan 1ro.'
          },
        {
            name: 'Mauricio',
            address: 'Granaderos entre 1200 a 1300 al lado de un chino',
            phone: '11 6583-8203',
            economicLevel: 2, // Nivel económico del 1 al 10, se representará con 6 símbolos de $
            history: 'Yube lleva su moto alli, odia a edu, dice q trabaja bien pero le da miedo recomendarlo, Eze obedece a yube y tambien la lleva ahi',
            references: 'aun que yube no quiere ella es la unica referencia y dice que es el mejor mecanico de todos los tiempos'
          }
    ],
    'Tiendas': [],
    'Otros': [],
  };

  return (
    <div className="directory">
      <h1 className="directory-title">Directorio de Contactos</h1>
      {Object.keys(categories).map(category => (
        <DirectoryItem key={category} category={category} contacts={categories[category]} />
      ))}
    </div>
  );
}

export default Directorio;
