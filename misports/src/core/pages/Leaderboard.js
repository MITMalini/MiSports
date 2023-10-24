import React from "react";
import "../styles/dashboard-styles.css";
import SideNav from "../components/SideNav";

const LEADERBOARD = (props) => {
  return (
    <div>
      <SideNav />
      <div className="containerDashboard1">
        <div className="containerDashboard2">
          <span className="text">
            <span>LEADERBOARD</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LEADERBOARD;
