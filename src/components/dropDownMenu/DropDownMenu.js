import React, { useState, useEffect } from "react";
import "./drop-down-menu.css";

export default function DropDownMenu({ menuTitle, menuItems }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest(".dropdown-menu")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="dropdown-menu">
      <div
        className={`dropdown-menu-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="15" height="15" viewBox="0 0 19 19">
          <polygon points="0,0 19,0 9.5,19" />
        </svg>
        <h2>{menuTitle}</h2>
        <svg width="15" height="15" viewBox="0 0 19 19">
          <polygon points="0,0 19,0 9.5,19" />
        </svg>
      </div>
      {isOpen && (
        <>
          {/* <div className="dropdown-menu-overlay"></div> */}
          <ul
            className={`dropdown-menu-list`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {menuItems}
          </ul>
        </>
      )}
    </div>
  );
}
