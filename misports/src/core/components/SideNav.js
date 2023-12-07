import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navigation-styles.css";
import { useLogout } from "../hooks/useLogout";
const SideNav = () => {
  const { logout } = useLogout();

  return (
    <div className="side-nav">
      <div className="side-nav-logo"></div>
      <div className="side-nav-options">
        <ul className="side-nav-ul">
          <li>
            <NavLink
              to="/dashboard"
              activeclassname="active"
              className="nav-link"
            >
              DASHBOARD
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboard"
              activeclassname="active"
              className="nav-link"
            >
              LEADERBOARD
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pastevents"
              activeclassname="active"
              className="nav-link"
            >
              PAST EVENTS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/viewallevents"
              activeclassname="active"
              className="nav-link"
            >
              UPCOMING EVENTS
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/addsports"
              activeclassname="active"
              className="nav-link"
            >
              ADD SPORTS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addevent"
              activeclassname="active"
              className="nav-link"
            >
              ADD EVENT
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/addplayer"
              activeclassname="active"
              className="nav-link"
            >
              ADD PLAYER
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/addusers"
              activeclassname="active"
              className="nav-link"
            >
              ADD USERS
            </NavLink>
          </li> */}
          <li>
            <button className="nav-link-button" onClick={logout}>
              LOG OUT
            </button>
          </li>
        </ul>
      </div>
      <div className="side-nav-logout"></div>
    </div>
  );
};

export default SideNav;
