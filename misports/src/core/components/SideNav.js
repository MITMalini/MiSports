import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navigation-styles.css";

const SideNav = () => {
  return (
    <div className="side-nav">
      <div className="side-nav-logo"></div>
      <div className="side-nav-options">
        <ul className="side-nav-ul">
          <li>
            <Link to="/dashboard" className="nav-link">
              DASHBOARD
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="nav-link">
              LEADERBOARD
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              UPCOMING EVENTS
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              ADD PLAYER
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              ADD SPORTS
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-link">
              ADD EVENT
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              VIEW ALL EVENTS
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              LOG OUT
            </Link>
          </li>
        </ul>
      </div>
      <div className="side-nav-logout"></div>
    </div>
  );
};

export default SideNav;
