import React, { useState, useEffect } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import { projectFirestore } from "../components/firebase-config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const AddTeam = (props) => {
  const location = useLocation();
  const playerCollectionRef = collection(projectFirestore, "Player");
  const eventData = location.state.eventData;
  const [eventName, setEventName] = useState(
    location.state.eventData.eventName
  );
  const [date, setDate] = useState(location.state.eventData.date);
  const [femalePlayers, setFemalePlayers] = useState([]);
  const [malePlayers, setMalePlayers] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(location.state.userHouse);
  const [selectedMalePlayers, setSelectedMalePlayers] = useState([]);
  const [selectedFemalePlayers, setSelectedFemalePlayers] = useState([]);
  const teamCollectionRef = collection(projectFirestore, "Teams");
  const navigate = useNavigate();

  const handleAddTeam = async (e) => {
    e.preventDefault();

    try {
      // Validate if the event input is not empty
      if (selectedFemalePlayers.length === 0) {
        alert("Female players cannot be empty");
        return;
      }
      if (selectedFemalePlayers.length === 0) {
        alert("Female players cannot be empty");
        return;
      }
      if (selectedMalePlayers.length > eventData.participants.male) {
        alert(
          "Male players cannot be more than Approves number of participants"
        );
        return;
      }
      if (selectedFemalePlayers.length > eventData.participants.female) {
        alert(
          "Female players cannot be more than Approves number of participants"
        );
        return;
      }
      if (selectedMalePlayers.length < eventData.participants.male) {
        alert(
          "Male players cannot be less than Approves number of participants"
        );
        return;
      }
      if (selectedFemalePlayers.length < eventData.participants.female) {
        alert(
          "Female players cannot be less than Approves number of participants"
        );
        return;
      }

      await addDoc(teamCollectionRef, {
        EventData: eventData,
        House: selectedHouse,
        MaleParticipants: selectedMalePlayers,
        FemaleParticipants: selectedFemalePlayers,
      });
      // Optionally, you can clear the form after submitting

      alert("Team added successfully!");
      navigate("/dashboard"); // Set the success message
      // Optionally, you can clear the success message after a few seconds
      // Optionally, you can navigate to a different page or show a success message
    } catch (error) {
      // Handle the error (you can show an error message to the user)
      console.error("Error adding event:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const femaledata = await getDocs(
          query(
            playerCollectionRef,
            where("House", "==", selectedHouse),
            where("Gender", "==", "Female")
          )
        );
        setFemalePlayers(
          femaledata.docs.map((doc) => ({
            value: doc.id,
            label: `${doc.data().FirstName} ${doc.data().LastName}`,
          }))
        );

        const maledata = await getDocs(
          query(
            playerCollectionRef,
            where("House", "==", selectedHouse),
            where("Gender", "==", "Male")
          )
        );
        setMalePlayers(
          maledata.docs.map((doc) => ({
            value: doc.id,
            label: `${doc.data().FirstName} ${doc.data().LastName}`,
          }))
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
            <form className="containeraddteamform" onSubmit={handleAddTeam}>
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
                    House:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="name"
                  name="name"
                  value={selectedHouse}
                  onChange={(e) => {
                    setSelectedHouse(e.target.value);
                    console.log("House:", selectedHouse);
                  }}
                  readOnly
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    Participants:
                  </label>
                </div>
                <input
                  className="addplayerdivinputparticipants"
                  type="text"
                  id="name"
                  name="name"
                  value={"  Male: " + eventData.participants.male}
                  readOnly
                />
                <input
                  className="addplayerdivinputparticipants"
                  type="text"
                  id="name"
                  name="name"
                  value={"Female: " + eventData.participants.female}
                  readOnly
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    Male Participants:
                  </label>
                </div>
                <Select
                  className="addplayerstoeventdivselect"
                  onChange={(selectedOptions) => {
                    const maxAllowedSelections = eventData.participants.male;
                    console.log(maxAllowedSelections);
                    if (
                      selectedOptions &&
                      selectedOptions.length <= maxAllowedSelections
                    ) {
                      const players = selectedOptions.map(
                        (option) => option.label
                      );
                      setSelectedMalePlayers(players);
                      console.log("MalePlayers:", players);
                    } else {
                      // Handle exceeding the maximum allowed selections (e.g., show a message)
                      alert(
                        "Exceeded the maximum Male Players selections, Please remove the Extra Player"
                      );
                      setSelectedMalePlayers((prevSelected) => prevSelected);
                    }
                  }}
                  options={malePlayers}
                  isMulti
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    Female Participants:
                  </label>
                </div>
                <Select
                  className="addplayerstoeventdivselect"
                  onChange={(selectedOptions) => {
                    const maxAllowedSelections = eventData.participants.female;
                    const length = 1;
                    console.log(maxAllowedSelections);
                    if (
                      selectedOptions &&
                      selectedOptions.length <= maxAllowedSelections
                    ) {
                      const players = selectedOptions.map(
                        (option) => option.label
                      );
                      setSelectedFemalePlayers(players);
                      console.log("femalePlayers:", players);
                    } else {
                      alert(
                        "Exceeded the maximum Female Playersallowed selections, Please remove the Extra Player"
                      );
                    }
                  }}
                  options={femalePlayers}
                  isMulti
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
export default AddTeam;
