import React, { useState, useEffect } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import Select from "react-select";
import SideNav from "../components/SideNav";
import { projectFirestore } from "../components/firebase-config";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

const AddEvent = () => {
  const [sport, setSport] = useState([]);
  const [selectedSport, setSelectedSport] = useState([]);
  const [event, setEvent] = useState([]);
  const [date, setDate] = useState([]);
  const [starttime, setStarttime] = useState([]);
  const [endtime, setEndtime] = useState([]);
  const [location, setLocation] = useState([]);
  const [male, setMale] = useState([]);
  const [female, setFemale] = useState([]);
  const sportCollectionRef = collection(projectFirestore, "Sport");
  const eventCollectionRef = collection(projectFirestore, "Event");

  const handleAddEvent = async (e) => {
    e.preventDefault();

    try {
      // Validate if the event input is not empty
      if (!event.trim()) {
        // Handle empty input error (you can show a message to the user)
        console.error("Event name cannot be empty");
        return;
      }
      const maleNumber = parseInt(male, 10);
      const femaleNumber = parseInt(female, 10);

      // Check if the conversion is successful
      if (isNaN(maleNumber) || isNaN(femaleNumber)) {
        console.error("Invalid points. Please enter valid numbers.");
        return;
      }
      // Add a new event to the Firestore collection
      await addDoc(eventCollectionRef, {
        sport: selectedSport,
        eventName: event,
        date: date,
        startTime: starttime,
        endTime: endtime,
        location: location,
        participants: {
          male: maleNumber,
          female: femaleNumber,
        },
      });
      // Optionally, you can clear the form after submitting
      setSelectedSport("");
      setSport("");
      setEvent("");
      setDate("");
      setStarttime("");
      setEndtime("");
      setLocation("");
      setMale("");
      setFemale("");

      alert("Event added successfully!"); // Set the success message
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
        console.log("Firestore instance:", projectFirestore);
        // Fetch data from Firestore
        const data = await getDocs(query(sportCollectionRef));
        setSport(
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
            <span>ADD EVENT</span>
          </span>
        </div>
        <div className="containeraddplayer1">
          <div className="containeraddplayer2">
            <form className="containeraddplayerform" onSubmit={handleAddEvent}>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="name" className="addplayerlabeltext">
                    Sport:
                  </label>
                </div>
                <Select
                  className="addplayerdivselect"
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      const sport = selectedOption.label;
                      setSelectedSport(sport);
                      console.log("House:", selectedOption.label);
                    }
                  }}
                  options={sport}
                />
              </div>
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
                  value={event}
                  onChange={(e) => {
                    setEvent(e.target.value);
                    console.log("Event Name:", e.target.value);
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
                  type="date"
                  id="name"
                  name="name"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    console.log("Event Date:", e.target.value);
                  }}
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="team" className="addplayerlabeltext">
                    Start Time:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="time"
                  id="time"
                  name="time"
                  value={starttime}
                  onChange={(e) => {
                    setStarttime(e.target.value);
                    console.log("Start Time:", e.target.value);
                  }}
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="team" className="addplayerlabeltext">
                    End Time:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="time"
                  id="phonenumber"
                  name="phonenumber"
                  value={endtime}
                  onChange={(e) => {
                    setEndtime(e.target.value);
                    console.log("End Time:", e.target.value);
                  }}
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="team" className="addplayerlabeltext">
                    Location:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="house"
                  name="house"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    console.log("location:", e.target.value);
                  }}
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="team" className="addplayerlabeltext">
                    Participants:
                  </label>
                </div>
                <input
                  className="divinputnum1"
                  type="number"
                  id="house"
                  name="house"
                  placeholder="Male"
                  min="0"
                  value={male}
                  onChange={(e) => {
                    setMale(e.target.value);
                    console.log("Males:", e.target.value);
                  }}
                />
                <input
                  className="divinputnum2"
                  type="number"
                  id="house"
                  name="house"
                  placeholder="Female"
                  min="0"
                  value={female}
                  onChange={(e) => {
                    setFemale(e.target.value);
                    console.log("Females:", e.target.value);
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

export default AddEvent;
