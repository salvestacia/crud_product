import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const sidebarStyle = {
    width: "150px",
    height: "100vh",
    backgroundColor: "#333",
    color: "white",
    padding: "20px",
    position: "fixed",
    top: "0",
    left: "0",
  };

  const linkStyle = {
    display: "block",
    color: "white",
    textDecoration: "none",
    padding: "10px 0",
    fontSize: "18px",
  };

  return (
    <div style={sidebarStyle}>
      <h2>Management Product</h2>
      <Link to="/" style={linkStyle}>
        Dashboard
      </Link>
      <Link to="/products" style={linkStyle}>
        Data Product
      </Link>
    </div>
  );
};

export default Sidebar;
