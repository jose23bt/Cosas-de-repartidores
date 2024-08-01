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
                name: 'Guido',
                address: 'todo por el wasa',
                phone: '11 3682-2074',
                economicLevel: 6, // Nivel económico del 1 al 10, se representará con 6 símbolos de $
                history: 'Una vez joseito intento contactarlo por un accidente, fue lento para responder.',
                references: 'Amigo de dani, dani dice q es un genio, un Better call saul argento, listo para cagar a tu adversario, si le escribes, escribele de parte de dani'
            },
            {
                name: 'Dr Ivan T Verá',
                address: 'todo por el wasaaa',
                phone: '11 5329-4656',
                economicLevel: 6, // Nivel económico del 1 al 10, se representará con 6 símbolos de $
                history: 'lleva el caso del accidente de andrea, todo un criminal, te infla los presupuestos mas que la inflacion, responde los mensajer rapido, quiere atender tu caso, le gusta la platica.',
                references: 'Andrea, aun no le han pagado nada pero no tiene otro abogado aquien referir'
            }
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
                address: 'Granaderos entre 1200 a 1300 al frente de un chino',
                phone: '11 6583-8203',
                economicLevel: 2, // Nivel económico del 1 al 10, se representará con 6 símbolos de $
                history: 'Yube lleva su moto alli, odia a edu, dice q trabaja bien pero le da miedo recomendarlo, Eze obedece a yube y tambien la lleva ahi',
                references: 'aun que yube no quiere ella es la unica referencia y dice que es el mejor mecanico de todos los tiempos (yube dice que si le sale mal la recomendacion mamenlo)'
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
