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
        name: 'Chanta 1',
        address: 'La concha del pato',
        phone: '666',
        economicLevel: 6, // Nivel económico del 1 al 10, se representará con 6 símbolos de $
        history: 'Un locura',
        references: 'El Joseito'
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
