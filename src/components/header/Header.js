import React from "react";
import "./header.css";
import HeaderMenu from "../headerMenu/HeaderMenu.js";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
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
        <NavLink to={"/home"}>
          <h1>{groupName}</h1>
        </NavLink>
      </div>
    </header>
  );
}
