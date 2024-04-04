import React from "react";
import { Link } from "react-router-dom";

function MenuBar({ linksToShow }) {
  return (
    <div className="menu-bar">
      {linksToShow.home && (
        <Link to="/">
          <div className="menu-item">
            {/* Insert your home icon here */}
            <img src="home-icon.png" alt="Home Icon" />
            <span>Home</span>
          </div>
        </Link>
      )}
      {linksToShow.newPlan && (
        <div className="menu-item">
          {/* Insert your new plan icon here */}
          <img src="new-plan-icon.png" alt="New Plan Icon" />
        </div>
      )}
      {linksToShow.account && (
        <Link to="/settings">
          <div className="menu-item">
            <span>Account</span>
            {/* Insert your user icon here */}
            <img src="user-icon.png" alt="User Icon" />
          </div>
        </Link>
      )}
    </div>
  );
}

export default MenuBar;
