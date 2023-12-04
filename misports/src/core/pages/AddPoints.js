import React, { useEffect, useState } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import { useLocation } from "react-router-dom";
import SideNav from "../components/SideNav";
import Select from "react-select";
import { projectFirestore } from "../components/firebase-config";
import { collection, getDocs, query, addDoc } from "firebase/firestore";

const AddPoints = (props) => {
  const [houses, setHouses] = useState([]);
  const location = useLocation();
  const [eventName, setEventName] = useState(
    location.state.eventData.eventName
  );
  const [date, setDate] = useState(location.state.eventData.date);
  const [selectedHouse1, setSelectedHouse1] = useState("");
  const [selectedHouse2, setSelectedHouse2] = useState("");
  const [selectedHouse3, setSelectedHouse3] = useState("");
  const [points1, setPoints1] = useState();
  const [points2, setPoints2] = useState();
  const [points3, setPoints3] = useState();
  const points1Value = parseInt(points1, 10);
  const points2Value = parseInt(points2, 10);
  const points3Value = parseInt(points3, 10);

  const eventData = location.state.eventData;
  const houseCollectionRef = collection(projectFirestore, "House");
  const pointsCollectionRef = collection(projectFirestore, "Point");

  const handleAddPoints = async (e) => {
    e.preventDefault();

    try {
      // Validate if the player input is not empty
      if (typeof eventName !== "string" || !eventName.trim()) {
        console.error("Event Name cannot be empty");
        return;
      }
      // Convert points to numbers

      // Check if the conversion is successful
      if (isNaN(points1Value) || isNaN(points2Value) || isNaN(points3Value)) {
        console.error("Invalid points. Please enter valid numbers.");
        return;
      }
      // Add a new sport to the Firestore collection
      await addDoc(pointsCollectionRef, {
        EventRef: eventData.id,
        EventName: eventName,
        Date: date,
        firstPlace: {
          House: selectedHouse1,
          Points: points1Value,
        },
        secondPlace: {
          House: selectedHouse2,
          Points: points2Value,
        },
        thirdPlace: {
          House: selectedHouse3,
          Points: points3Value,
        },
      });
      alert("Points added successfully!");
      setSelectedHouse1("");
      setSelectedHouse2("");
      setPoints1("");
      setSelectedHouse3("");
      setPoints2("");
      setPoints3("");
      // Set the success message
      // Optionally, you can clear the success message after a few seconds
      // Optionally, you can navigate to a different page or show a success message
    } catch (error) {
      // Handle the error (you can show an error message to the user)
      console.error("Error adding player:", error.message);
    }
  };
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
            <span>ADD POINTS</span>
          </span>
        </div>
        <div className="containeraddplayer1">
          <div className="containeraddplayer2">
            <form className="containeraddplayerform" onSubmit={handleAddPoints}>
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
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    First Place:
                  </label>
                </div>
                <Select
                  className="addhousedivselect"
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      const house = selectedOption.label;
                      setSelectedHouse1(house);
                      console.log("House:", selectedOption.label);
                    }
                  }}
                  options={houses}
                />
                <input
                  className="addpoints"
                  type="number"
                  id="number-points1"
                  name="emailaddress"
                  placeholder="Points"
                  value={points1}
                  onChange={(e) => {
                    setPoints1(e.target.value);
                    console.log("place 1:", points1);
                  }}
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="team" className="addplayerlabeltext">
                    Second Place:
                  </label>
                </div>
                <Select
                  className="addhousedivselect"
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      const house = selectedOption.label;
                      setSelectedHouse2(house);
                      console.log("House:", selectedOption.label);
                    }
                  }}
                  options={houses}
                />
                <input
                  className="addpoints"
                  type="number"
                  id="number-points1"
                  name="emailaddress"
                  placeholder="Points"
                  value={points2}
                  onChange={(e) => {
                    setPoints2(e.target.value);
                    console.log("place 2:", points2);
                  }}
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="team" className="addplayerlabeltext">
                    Third Place:
                  </label>
                </div>
                <Select
                  className="addhousedivselect"
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      const house = selectedOption.label;
                      setSelectedHouse3(house);
                      console.log("House:", selectedOption.label);
                    }
                  }}
                  options={houses}
                />
                <input
                  className="addpoints"
                  type="number"
                  id="number-points1"
                  name="emailaddress"
                  placeholder="Points"
                  value={points3}
                  onChange={(e) => {
                    setPoints3(e.target.value);
                    console.log("place 3:", points3);
                  }}
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
export default AddPoints;
