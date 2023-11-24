import React, { useState } from "react";
import "../styles/desktop-styles.css";
import "../styles/monitor-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";

const AddPlayer = (props) => {
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [email, setEmail] = useState([]);
  const [phone, setPhone] = useState([]);

  const GenderOptions = [
    { _id: "1", value: "Male", label: "Male" },
    { _id: "2", value: "Female", label: "Female" },
  ];
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
                <div className="addplayerdivlabel">
                  <label htmlFor="name" className="addplayerlabeltext">
                    First Name:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="name" className="addplayerlabeltext">
                    Last Name:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    Gender:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  //   type="number"
                  type="text"
                  id="gender"
                  name="gender"
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="team" className="addplayerlabeltext">
                    Email:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="emailaddress"
                  name="emailaddress"
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="team" className="addplayerlabeltext">
                    Phone:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="team" className="addplayerlabeltext">
                    House:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="house"
                  name="house"
                />
              </div>
              <div className="containeraddplayerform2">
                <button type="submit" className="addplayerbutton">
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
