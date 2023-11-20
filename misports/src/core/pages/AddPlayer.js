import React from "react";
import "../styles/dashboard-styles.css";
import "../styles/addplayer-styles.css";
import SideNav from "../components/SideNav";

const AddPlayer = (props) => {
  return (
    <div>
      <SideNav />
      <div className="containerDashboard1">
        <div className="containerDashboard2">
          <span className="text">
            <span>ADD PLAYER</span>
          </span>
        </div>
        <div className="containeraddplayer1">
          <div className="containeraddplayer2">
            <form className="containeraddplayerform">
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="name" className="labeltext">
                    First Name:
                  </label>
                </div>
                <input className="divinput" type="text" id="name" name="name" />
              </div>
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="name" className="labeltext">
                    Last Name:
                  </label>
                </div>
                <input className="divinput" type="text" id="name" name="name" />
              </div>
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="age" className="labeltext">
                    Gender:
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
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="team" className="labeltext">
                    Email:
                  </label>
                </div>
                <input
                  className="divinput"
                  type="text"
                  id="emailaddress"
                  name="emailaddress"
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="team" className="labeltext">
                    Phone:
                  </label>
                </div>
                <input
                  className="divinput"
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="team" className="labeltext">
                    House:
                  </label>
                </div>
                <input
                  className="divinput"
                  type="text"
                  id="house"
                  name="house"
                />
              </div>
              <div className="containeraddplayerform2">
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

export default AddPlayer;
