import React from 'react';
import './header.css';
import HeaderMenu from '../headerMenu/HeaderMenu.js';
import { useLocation } from 'react-router-dom'; 
import { useAuth } from '../../pages/auth/AuthContext';

export default function Header() {
  const { logout } = useAuth();
  const location = useLocation(); 
  const currentPath = location.pathname;

  let groupName;
  if (currentPath === '/auth' || currentPath === '/guest') {
    groupName = "Group Scope";
  } else {
    groupName = localStorage.getItem('learningGroup');
  }

  return (
    <header className="header">
      <div className="header-title">
        <h1>{groupName}</h1>
      </div>
      {currentPath !== '/auth' && currentPath !== '/guest' && <HeaderMenu />}
    </header>
  );
}


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
