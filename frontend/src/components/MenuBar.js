import React from "react";
import { Link } from "react-router-dom";
import "../styles/menuBar.css";

function MenuBar({ linksToShow }) {
  return (
    <div className="menu-bar">
      {linksToShow.home && (
        <div className="menu-item" id="menu-home" style={{ gridArea: "left" }}>
          {/* Insert your home icon here */}
          <Link to="/">
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </Link>
        </div>
      )}
      {linksToShow.newPlan && (
        <div
          className="menu-item"
          id="menu-new-plan"
          style={{ gridArea: "center" }}
        >
          <i className="fa-solid fa-book-medical"></i>
        </div>
      )}
      {linksToShow.account && (
        <div
          className="menu-item"
          id="menu-account"
          style={{ gridArea: "right" }}
        >
          <Link to="/settings">
            <span>Account</span>
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MenuBar;
