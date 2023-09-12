import React, { useState, useEffect } from 'react';
import './navigation-menu.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../pages/auth/AuthContext'; 

function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null); 
  const { logout } = useAuth();

  useEffect(() => {
    const savedPictureUrl = localStorage.getItem('userPicture');
    if (savedPictureUrl) {
      setAvatarUrl(savedPictureUrl);
    }
  }, []);

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const MenuItem = ({ to, children }) => (
    <li onClick={handleCloseMenu}>
        <Link to={to}>{children}</Link>
    </li>
  );

  return (
    <>
      <button className="burger-menu" id="open-btn" onClick={handleOpenMenu}>
        {/* Іконка меню */}
        <svg stroke="white" strokeWidth="2" width="36" height="36" viewBox="0 0 24 24">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

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
      <div> 
        {avatarUrl && (
          <img src={avatarUrl} alt="Аватар користувача" className="user-avatar" />
        )}
        <button onClick={logout}>Вийти</button>
      </div>
    </>
  );
}

export default HeaderMenu;


