import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
                        <li><NavLink to="/" exact activeClassName="active">Inicio</NavLink></li>
                        <li><NavLink to="/blog" activeClassName="active">Blog</NavLink></li>
                        <li><NavLink to="/loans" activeClassName="active">Adelantos</NavLink></li>
                        <li><NavLink to="/Pagos" activeClassName="active">Simulador de Ganancias</NavLink></li>
                        <li><NavLink to="/faq" activeClassName="active">FAQ</NavLink></li>
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

