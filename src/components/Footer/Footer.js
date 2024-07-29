import React from 'react';
import './Footer.css'; // Asegúrate de tener el archivo CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <ul className="footer-nav">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/blog">Sobre Nosotros</a></li>
                    <li><a href="/loans">Política de Privacidad</a></li>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/faq">Términos y Condiciones</a></li>
                </ul>
                <p className="footer-info">© 2024 Blog de Repartidores. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;

