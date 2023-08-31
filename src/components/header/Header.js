
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import './../headerMenu/navigation-menu.css';
import HeaderMenu from '../headerMenu/HeaderMenu.js';
import { useAuth } from '../../pages/auth/AuthContext';  // додайте цей рядок

function Header() {
  const { logout } = useAuth();  // додайте цей рядок

  return (
    <header className="header">
      <div className="header-title">
        <h1>КБІКС-21-6</h1>
      </div>
      <HeaderMenu />
      <button onClick={logout}>Вийти</button> {/* додайте цей рядок */}
    </header>
  );
}

export default Header;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './header.css';
// import './../headerMenu/navigation-menu.css';
// import HeaderMemu from '../headerMenu/HeaderMenu.js';
// import PersonalAccount from '../personalAccount/PersonalAccount';

// function Header() {

//   return (
//     <header className="header">
//       <div className="header-title">
//         <h1>КБІКС-21-6</h1>
//       </div>
//       <HeaderMemu />
//       {/* <PersonalAccount /> */}
//     </header>
//   );
// }

// export default Header;
