import { useEffect, useState } from "react";
import "./header.css";
import HeaderMenu from "../headerMenu/HeaderMenu.js";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Header() {
  const { auth } = useAuth();
  const [headerTitle, setHeaderTitle] = useState("Group Scope");
  const location = useLocation();
  // console.log("Header:", headerTitle);

  useEffect(() => {
    setHeaderTitle(
      sessionStorage.getItem("currentHeaderTitle") || "Group Scope"
    );
  }, [location]);

  return (
    <>
      {auth?.role && <HeaderMenu />}
      <div className="header-title">
        <NavLink to={"/home"}>
          <h1>{headerTitle}</h1>
        </NavLink>
      </div>
    </>
  );
}
