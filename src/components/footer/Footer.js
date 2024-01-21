import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <span>©2023 Group Scope. Усі права захищені</span>
      <Link style={{ color: "#0047FF" }}>Політика конфіденційності</Link>
    </>
  );
}
