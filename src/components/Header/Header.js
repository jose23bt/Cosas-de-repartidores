import React, { useState } from 'react';
import './Header.css'; // Asegúrate de crear un archivo CSS para los estilos

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <h1>Logo</h1> {/* Aquí puedes reemplazar con tu logo */}
                </div>
                <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/loans">Adelantos</a></li>                        
                        <li><a href="/Pagos">Simulador de Ganancias</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                </nav>
                <button className="menu-toggle" onClick={toggleMenu}>
                    <span className="menu-icon"></span>
                    <span className="menu-icon"></span>
                    <span className="menu-icon"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
