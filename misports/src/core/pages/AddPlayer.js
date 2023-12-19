import React, { useState, useEffect } from "react";
import "../styles/desktop-styles.css";
import "../styles/monitor-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";
import Select from "react-select";
import { projectFirestore } from "../components/firebase-config";
import { getDocs, query, collection, addDoc } from "firebase/firestore";

const AddPlayer = (props) => {
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [email, setEmail] = useState([]);
  const [phone, setPhone] = useState([]);
  const [gender, setGender] = useState([]);
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState("");
  const houseCollectionRef = collection(projectFirestore, "House");
  const playerCollectionRef = collection(projectFirestore, "Player");

  const GenderOptions = [
    { _id: "1", value: "Male", label: "Male" },
    { _id: "2", value: "Female", label: "Female" },
  ];

  const handleAddPlayer = async (e) => {
    e.preventDefault();

    try {
      // Validate if the player input is not empty
      if (typeof firstName !== "string" || !firstName.trim()) {
        alert("First Name cannot be empty");
        return;
      }
      if (typeof lastName !== "string" || !lastName.trim()) {
        alert("Last Name cannot be empty");
        return;
      }
      if (typeof email !== "string" || !email.trim()) {
        alert("email cannot be empty");
        return;
      }
      if (typeof gender !== "string" || !gender.trim()) {
        alert("gender cannot be empty, Please select Again");
        return;
      }
      if (typeof phone !== "string" || !phone.trim()) {
        alert("phone number cannot be empty");
        return;
      }
      // Add a new sport to the Firestore collection
      await addDoc(playerCollectionRef, {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Phone: phone,
        Gender: gender,
        House: selectedHouse,
      });

      alert("Player added successfully!"); // Set the success message
      // Optionally, you can clear the success message after a few seconds
      setFirstName("");
      setEmail("");
      setLastName("");
      setPhone("");
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
            <span>ADD PLAYER</span>
          </span>
        </div>
        <div className="containeraddplayer1">
          <div className="containeraddplayer2">
            <form className="containeraddplayerform" onSubmit={handleAddPlayer}>
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
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    console.log("First Name:", firstName);
                  }}
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
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    console.log("Last Name:", lastName);
                  }}
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    Gender:
                  </label>
                </div>
                <Select
                  className="addplayerdivselect"
                  options={GenderOptions}
                  type="text"
                  id="gender"
                  name="gender"
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      const gender = selectedOption.value;
                      setGender(gender);
                      console.log("Gender:", gender);
                    }
                  }}
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
                  type="email"
                  id="emailaddress"
                  name="emailaddress"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log("Email:", email);
                  }}
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
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    console.log("Phone Number:", phone);
                  }}
                />
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="team" className="addplayerlabeltext">
                    House:
                  </label>
                </div>
                <Select
                  className="addplayerdivselect"
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      const house = selectedOption.label;
                      setSelectedHouse(house);
                      console.log("House:", selectedOption.label);
                    }
                  }}
                  options={houses}
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
