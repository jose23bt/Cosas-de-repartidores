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
      {
        name: 'Edu',
        address: 'Vélez Sársfield 2437',
        phone: '11 5623-5039',
        economicLevel: 4, // Nivel económico del 1 al 10, se representará con 6 símbolos de $
        history: 'Todos hemos ido ahi, hace la chamba, te atiende bien pero ojo que puede fallar o robar jaja nahhh mentira pero pilas',
        references: 'Su primer cliente, el samu. luego daniel se sintio celoso y lo desplazo y ahora es su amante y fan 1ro.'
      }
    ],
    'Mecánicos': [],
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
