import React, { useState } from 'react';
import './personalAccount.css';

function PersonalAccount() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleOpenProfile = () => {
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <header className="header">
      <div className="header-title">
        <h1>КБІКС-21-6</h1>
      </div>
      <button className="profile-button" onClick={handleOpenProfile}>Особистий кабінет</button>
      {isProfileOpen && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <h2>Особистий кабінет</h2>
            <p>Ви можете:</p>
            <ul>
              <li><a href="#">Редагувати профіль</a></li>
              <li><a href="#">Вийти</a></li>
            </ul>
            <button className="close-profile" onClick={handleCloseProfile}>Закрити</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default PersonalAccount;
