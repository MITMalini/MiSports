import React, { useState, useEffect } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";
import { projectFirestore } from "../components/firebase-config";
import { collection, addDoc } from "firebase/firestore";

const AddEvent = (props) => {
  const [sport, setSport] = useState([]);
  const [event, setEvent] = useState([]);
  const [date, setDate] = useState([]);
  const [starttime, setStarttime] = useState([]);
  const [endtime, setEndtime] = useState([]);
  const [location, setLocation] = useState([]);
  const [male, setMale] = useState([]);
  const [female, setFemale] = useState([]);
  const eventCollectionRef = collection(projectFirestore, "Sport");

  const handleAddEvent = async (e) => {
    e.preventDefault();

    try {
      // Validate if the event input is not empty
      if (!event.trim()) {
        // Handle empty input error (you can show a message to the user)
        console.error("Event name cannot be empty");
        return;
      }
      // Add a new event to the Firestore collection
      await addDoc(eventCollectionRef, {
        sport: sport,
        eventName: event,
        date: date,
        startTime: starttime,
        endTime: endtime,
        location: location,
        participants: {
          male: male,
          female: female,
        },
      });
      // Optionally, you can clear the form after submitting
      setEvent("");
      setDate("");
      setStarttime("");
      setEndtime("");
      setLocation("");
      setMale("");
      setFemale("");

      alert("Event added successfully!"); // Set the success message
      // Optionally, you can clear the success message after a few seconds
      setTimeout(() => {
        alert("");
      }, 5000);
      // Optionally, you can navigate to a different page or show a success message
    } catch (error) {
      // Handle the error (you can show an error message to the user)
      console.error("Error adding event:", error.message);
    }
  };

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
