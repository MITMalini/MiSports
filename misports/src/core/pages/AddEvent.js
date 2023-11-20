import React from "react";
import "../styles/dashboard-styles.css";
import "../styles/addplayer-styles.css";
import SideNav from "../components/SideNav";

const AddEvent = (props) => {
  return (
    <div>
      <SideNav />
      <div className="containerDashboard1">
        <div className="containerDashboard2">
          <span className="text">
            <span>ADD EVENT</span>
          </span>
        </div>
        <div className="containeraddplayer1">
          <div className="containeraddplayer2">
            <form className="containeraddplayerform">
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="name" className="labeltext">
                    Sport:
                  </label>
                </div>
                <input className="divinput" type="text" id="name" name="name" />
              </div>
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="name" className="labeltext">
                    Event Name:
                  </label>
                </div>
                <input className="divinput" type="text" id="name" name="name" />
              </div>
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="name" className="labeltext">
                    Date:
                  </label>
                </div>
                <input className="divinput" type="date" id="name" name="name" />
              </div>
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="team" className="labeltext">
                    Start Time:
                  </label>
                </div>
                <input className="divinput" type="time" id="time" name="time" />
              </div>
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="team" className="labeltext">
                    End Time:
                  </label>
                </div>
                <input
                  className="divinput"
                  type="time"
                  id="phonenumber"
                  name="phonenumber"
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="team" className="labeltext">
                    Location:
                  </label>
                </div>
                <input
                  className="divinput"
                  type="text"
                  id="house"
                  name="house"
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="divlabel">
                  <label htmlFor="team" className="labeltext">
                    Participats:
                  </label>
                </div>
                <input
                  className="divinputnum1"
                  type="number"
                  id="house"
                  name="house"
                  placeholder="Male"
                  min="0"
                />
                <input
                  className="divinputnum2"
                  type="number"
                  id="house"
                  name="house"
                  placeholder="Female"
                  min="0"
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

export default AddEvent;
