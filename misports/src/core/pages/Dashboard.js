import React from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";

const Dashboard = (props) => {
  return (
    <div>
      <SideNav />
      <div className="containerDashboard1">
        <div className="containerDashboard2">
          <span className="text">
            <span>DASHBOARD</span>
          </span>
        </div>
        {/* {console.log(role)} */}
      </div>
    </div>
  );
};

export default Dashboard;
