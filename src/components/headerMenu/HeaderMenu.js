import React, { useState, useEffect } from "react";
import "./navigation-menu.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../pages/auth/AuthContext";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const { logout } = useAuth();
  let overlayClassName = `overlay ${isOpen ? "active" : ""}`;

  useEffect(() => {
    const savedPictureUrl = localStorage.getItem("userPicture");
    if (savedPictureUrl) {
      setAvatarUrl(savedPictureUrl);
    }
  }, []);

  function setOpenedState() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isOpen]);

  const openInNewTabAndCloseCurrent = (url) => {
    const newTab = window.open(url, "_blank");
    if (newTab) {
      newTab.focus();
    }
    window.close();
  };

  const MenuItem = ({ to, children }) => (
    <li
      onClick={() => {
        setOpenedState();
      }}
    >
      <Link className="menu-item" to={to}>
        {children}
      </Link>
    </li>
  );
  const userRole = localStorage.getItem("userRole");

  return (
    <>
      <button className="bm-open-btn" onClick={() => setOpenedState()}>
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

      <div className={overlayClassName} onClick={() => setOpenedState()}></div>

      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="bm-close-btn" onClick={() => setOpenedState()}>
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
        <ul className="menu-list">
          <MenuItem to="/">Головне меню</MenuItem>
          {/* <MenuItem to="#">Новини</MenuItem> */}
          <MenuItem to="/successfulStudent">Успішність</MenuItem>
          {userRole === "HEADMAN" && (
            <MenuItem to="/successfulGroup">Успішність групи</MenuItem>
          )}
        </ul>
      </nav>

      <div className="user-avatar">
        <button className="user-avatar-btn" onClick={logout}>
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
