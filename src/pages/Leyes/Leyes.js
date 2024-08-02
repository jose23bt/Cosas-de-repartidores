import React from 'react';
import './Leyes.css';

const LawCard = ({ law }) => (
    <a href={law.link} target="_blank" rel="noopener noreferrer" className="law-card">
        <h3>{law.title}</h3>
    </a>
);

const Leyes = () => {
    const laws = [
        {
            title: 'Ley Nacional de Tránsito',
            link: 'https://www.argentina.gob.ar/normativa/nacional/ley-24449-5626'
        },
        {
            title: 'Ley de Tránsito de Buenos Aires',
            link: 'https://www.buenosaires.gob.ar/areas/seguridad_justicia/seguridadvial/leyes/'
        },
        {
            title: 'Ordenanza de Tránsito de Lomas de Zamora',
            link: 'https://lomasdezamora.gob.ar/ordenanza-transito'
        }
    ];

    const requirements = [
        'Licencia de conducir vigente',
        'Cédula verde o azul del vehículo',
        'Verificación Técnica Vehicular (VTV) al día',
        'Seguro obligatorio del vehículo',
        'Patente del vehículo al día',
        'Extintor de incendios en el vehículo',
        'Balizas portátiles',
        'Chaleco reflectante'
    ];

    return (
        <div className="laws-container">
            <h1>Leyes de Tránsito y Normas OJO NO FUNCIONA AUN, asi como tus planes para hacerte rico jaja</h1>
            <div className="laws-list">
                {laws.map((law, index) => (
                    <LawCard key={index} law={law} />
                ))}
            </div>
            <div className="requirements-container">
                <details>
                    <summary>Requisitos para poder circular</summary>
                    <ul>
                        {requirements.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                        ))}
                    </ul>
                </details>
            </div>
        </div>
    );
}

export default Leyes;

