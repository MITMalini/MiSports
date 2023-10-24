import React from "react";
import "../styles/dashboard-styles.css";
import "../styles/addplayer-styles.css";
import SideNav from "../components/SideNav";

const AddSport = (props) => {
  return (
    <div>
      <SideNav />
      <div className="containerDashboard1">
        <div className="containerDashboard2">
          <span className="text">
            <span>ADD SPORT</span>
          </span>
        </div>
        <div className="containeraddplayer1">
          <div className="containeraddplayer2">
            <form className="containeraddsportform">
              <div className="containeraddsportform1">
                <div className="divlabel">
                  <label htmlFor="age" className="labeltext">
                    Sport Name:
                  </label>
                </div>
                <input
                  className="divinput"
                  //   type="number"
                  type="text"
                  id="gender"
                  name="gender"
                />
              </div>
              <div className="containeraddsportform2">
                <button type="submit" className="button">
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSport;
