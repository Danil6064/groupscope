import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../header/header.css';
import './navigation-menu.css';
import { useAuth } from '../../pages/auth/AuthContext'; 

function HeaderMemu() {
  const [isOpen, setIsOpen] = useState(false);
  
  const { logout } = useAuth();

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  // Обгортка для пунктів меню
  const MenuItem = ({ to, children }) => (
    <li onClick={handleCloseMenu}>
        <Link to={to}>{children}</Link>
    </li>
  );

  return (
    <header className="header">
      <button className="burger-menu" id="open-btn" onClick={handleOpenMenu}>
        <svg stroke="white" strokeWidth="2" width="36" height="36" viewBox="0 0 24 24">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <div className="header-title">
        <h1>КБІКС-21-6</h1>
      </div>
      <nav className={`sidebar ${isOpen ? 'open' : ''}`} id="menu">
        <div className="sidebar-header">
          <button className="close-sidebar" id="close-btn" onClick={handleCloseMenu}>
            <svg stroke="white" strokeWidth="2" width="36" height="36" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <ul className="menu-list">
            <MenuItem to="/">Головне меню</MenuItem>
            <MenuItem to="#">Новини</MenuItem>
            <MenuItem to="/successfulStudent">Успішність</MenuItem>
            <MenuItem to="/successfulGroup">Успішність групи</MenuItem>
        </ul>
      </nav>
      <div className={`overlay ${isOpen ? 'active' : ''}`} id="menu-overlay"></div>
      <button onClick={logout}>Вийти</button>
    </header>
  );
}

export default HeaderMemu;
