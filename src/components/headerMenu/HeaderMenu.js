<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../header/header.css';
import './navigation-menu.css';
import { useAuth } from '../../pages/auth/AuthContext';  // додайте цей рядок

function HeaderMemu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };
  const { logout } = useAuth();  // додайте цей рядок
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
          <li><a href="/">Головне меню</a></li>
          <li><a href="#">Новини</a></li>
          <li><a href="successfulStudent">Успішність</a></li>
          <li><a href="successfulGroup">Успішність групи</a></li>
        </ul>
      </nav>
      <div className={`overlay ${isOpen ? 'active' : ''}`} id="menu-overlay"></div>
      <button onClick={logout}>Вийти</button> {/* додайте цей рядок */}
    </header>
  );
}

export default HeaderMemu;
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../header/header.css';
import './navigation-menu.css';

function HeaderMemu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

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
          <li><a href="/">Головне меню</a></li>
          <li><a href="#">Новини</a></li>
          <li><a href="successfulStudent">Успішність</a></li>
          <li><a href="successfulGroup">Успішність групи</a></li>
        </ul>
      </nav>
      <div className={`overlay ${isOpen ? 'active' : ''}`} id="menu-overlay"></div>
    </header>
  );
}

export default HeaderMemu;
>>>>>>> 9c66d1cf54a1d5acc5699260c428742d2f684960
