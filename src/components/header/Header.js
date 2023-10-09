import React from "react";
import "./header.css";
import HeaderMenu from "../headerMenu/HeaderMenu.js";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../pages/auth/AuthContext";

export default function Header() {
  const { logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  let groupName;
  if (currentPath === "/" || currentPath === "/guest") {
    groupName = "Group Scope";
  } else {
    groupName = localStorage.getItem("learningGroup");
  }

  return (
    <header className="header">
      {currentPath !== "/" && currentPath !== "/guest" && <HeaderMenu />}
      <div className="header-title">
        <h1>{groupName}</h1>
      </div>
    </header>
  );
}
