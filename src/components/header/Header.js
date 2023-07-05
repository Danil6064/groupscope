import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import './../headerMenu/navigation-menu.css';
import HeaderMemu from '../headerMenu/HeaderMenu.js';

function Header() {

  return (
    <header className="header">

      <div className="header-title">
        <h1>КБІКС-21-6</h1>
      </div>
      <HeaderMemu />
    </header>
  );
}

export default Header;
