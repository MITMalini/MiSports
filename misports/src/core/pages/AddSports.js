import React, { useState } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";
import { projectFirestore } from "../components/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";

const AddSport = (props) => {
  const [sport, setSport] = useState([]);
  const sportCollectionRef = collection(projectFirestore, "Sport");

  const handleAddSport = async (e) => {
    e.preventDefault();

    try {
      // Validate if the sport input is not empty
      if (typeof sport !== "string" || !sport.trim()) {
        // Handle empty input error (you can show a message to the user)
        console.error("Sport name cannot be empty");
        return;
      }
      // Add a new sport to the Firestore collection
      await addDoc(sportCollectionRef, { Name: sport });
      // Optionally, you can clear the form after submitting
      setSport("");
      alert("Sport added successfully!"); // Set the success message
      // Optionally, you can clear the success message after a few seconds

      // Optionally, you can navigate to a different page or show a success message
    } catch (error) {
      // Handle the error (you can show an error message to the user)
      console.error("Error adding sport:", error.message);
    }
  };

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
            <form className="containeraddsportform" onSubmit={handleAddSport}>
              <div className="containeraddsportform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    Sport Name:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="sport"
                  name="sport"
                  value={sport}
                  onChange={(e) => {
                    setSport(e.target.value);
                    console.log("Sport value:", sport);
                  }}
                />
              </div>
              <div className="containeraddsportform2">
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

export default AddSport;
