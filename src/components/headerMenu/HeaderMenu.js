import React, { useState, useEffect } from "react";
import "./navigation-menu.css";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  // const { logout } = useAuth();

  useEffect(() => {
    const savedPictureUrl = localStorage.getItem("pictureUrl")
    if (savedPictureUrl) {
      setAvatarUrl(savedPictureUrl);
    }
  }, []);

  // function setOpenedState() {
  //   setIsOpen(!isOpen);
  // }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isOpen]);
  
  let overlayClassName = `overlay ${isOpen ? "active" : ""}`;

  return (
    <>
      <button className="bm-open-btn" onClick={() => setIsOpen(!isOpen)}>
        <svg
          stroke="white"
          strokeWidth="2"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className={overlayClassName} onClick={() => setIsOpen(!isOpen)}></div>

      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="bm-close-btn" onClick={() => setIsOpen(!isOpen)}>
            <svg
              stroke="white"
              strokeWidth="2"
              width="36"
              height="36"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <MenuList onMenuItemClick={() => setIsOpen(!isOpen)} />
      </nav>

      <div className="user-avatar">
        <button className="user-avatar-btn" onClick={null}>
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Аватар користувача"
              className="user-avatar-img"
            />
          )}
        </button>
      </div>
    </>
  );
}

function MenuList({ onMenuItemClick }) {
  const {auth} = useAuth()
  return (
    <div className="menu-list">
      <Link to="/home" className="menu-item" onClick={onMenuItemClick}>
        Головне меню
      </Link>

      {/* <Link to="#" className="menu-item" onClick={onMenuItemClick}>
        Новини
      </Link> */}

      <Link
        to="/successfulStudent"
        className="menu-item"
        onClick={onMenuItemClick}
      >
        Успішність
      </Link>

      {auth.role === "HEADMAN" && (
        <Link
          to="/successfulGroup"
          className="menu-item"
          onClick={onMenuItemClick}
        >
          Успішність групи
        </Link>
      )}
    </div>
  );
}
