import React, { useState, useEffect } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import Select from "react-select";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router-dom";
import SideNav from "../components/SideNav";
import { projectFirestore } from "../components/firebase-config";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

const AddTeam = (props) => {
  const location = useLocation();
  const { user } = useAuthContext();
  const houseCollectionRef = collection(projectFirestore, "House");

  const eventData = location.state.eventData;
  const [eventName, setEventName] = useState(
    location.state.eventData.eventName
  );
  const [date, setDate] = useState(location.state.eventData.date);
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Firestore instance:", projectFirestore);
        // Fetch data from Firestore
        const data = await getDocs(query(houseCollectionRef));
        setHouses(
          data.docs.map((doc) => ({ value: doc.id, label: doc.data().Name }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <SideNav />
      <div className="containerDashboard1">
        <div className="containerDashboard2">
          <span className="text">
            <span>REGISTER TEAM</span>
          </span>
        </div>
        <div className="containeraddplayer1">
          <div className="containeraddplayer2">
            <form className="containeraddplayerform">
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="name" className="addplayerlabeltext">
                    Event Name:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="name"
                  name="name"
                  value={eventData.eventName}
                  onChange={(e) => {
                    setEventName(e.target.value);
                    console.log("event name:", eventName);
                  }}
                  readOnly
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="name" className="addplayerlabeltext">
                    Date:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="name"
                  name="name"
                  value={eventData.date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    console.log("date:", date);
                  }}
                  readOnly
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    Male Participants:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="name"
                  name="name"
                  value={eventData.participants.male}
                  readOnly
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    Female Participants:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="name"
                  name="name"
                  value={eventData.participants.female}
                  readOnly
                />
              </div>
              {/* <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    House:
                  </label>
                </div>
                <Select
                  className="addhousedivselect"
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      const house = selectedOption.label;
                      setSelectedHouse(house);
                      console.log("House:", selectedOption.label);
                    }
                  }}
                  options={houses}
                />
              </div> */}

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
export default AddTeam;
