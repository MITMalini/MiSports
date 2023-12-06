import React, { useEffect, useState } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import { useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "../components/firebase-config";
import Select from "react-select";
import { projectFirestore } from "../components/firebase-config";
import { getDocs, query, collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import SideNav from "../components/SideNav";

const AddUser = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [user, loading] = useAuthState(auth);
  const userCollectionRef = collection(projectFirestore, "Users");
  const houseCollectionRef = collection(projectFirestore, "House");
  const [selectedHouse, setSelectedHouse] = useState("");
  const [houses, setHouses] = useState([]);
  const [showAdditionalField, setShowAdditionalField] = useState(false);

  const RoleOptions = [
    { _id: "1", value: "HR", label: "HR" },
    { _id: "2", value: "ADMIN", label: "ADMIN" },
    { _id: "2", value: "House Captain", label: "House Captain" },
    { _id: "2", value: "House Vice Captain", label: "House Vice Captain" },
  ];

  const handleAddUser = async (name, email, password, role, selectedHouse) => {
    try {
      const userCredential = await registerWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("insettings", selectedHouse);
      // Create user data object

      const userData = {
        Name: name,
        UID: userCredential.user.uid,
        email: userCredential.user.email,
        role: role,
      };
      if (selectedHouse) {
        userData.house = selectedHouse;
      }
      // Add the "House" field if selectedHouse is defined

      // Add the document to the "Users" collection
      await addDoc(userCollectionRef, userData);
      setSelectedHouse("");
    } catch (error) {
      // Handle errors
      console.error("Error during user registration:", error.message);
    }
  };
  const handleRoleChange = (selectedOption) => {
    if (selectedOption) {
      const selectedRole = selectedOption.value;
      setRole(selectedRole);
      console.log("role:", selectedRole);

      // Check if the selected role is 'House Captain'
      setShowAdditionalField(
        selectedRole === "House Captain" ||
          selectedRole === "House Vice Captain"
      );
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
            <span>ADD USERS</span>
          </span>
        </div>
        <div className="containeraddplayer1">
          <div className="containeraddplayer2">
            <form className="formAddUser">
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    FULL NAME:
                  </label>
                </div>
                <div className="adduserdivinput">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="adduserdivinput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    EMAIL:
                  </label>
                </div>
                <div className="adduserdivinput">
                  <input
                    type="text"
                    placeholder="Email Password"
                    className="adduserdivinput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    PASSWORD:
                  </label>
                </div>
                <div className="adduserdivinput">
                  <input
                    type="password"
                    placeholder="Password"
                    className="adduserdivinput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="age" className="addplayerlabeltext">
                    USER ROLE:
                  </label>
                </div>
                <div className="adduserdivinput1">
                  <Select
                    className="addplayerdivselect"
                    options={RoleOptions}
                    type="text"
                    id="gender"
                    name="gender"
                    onChange={handleRoleChange}
                  />
                </div>
              </div>
              {showAdditionalField && (
                <div className="containeraddplayerform1">
                  <div className="addplayerdivlabel">
                    <label htmlFor="age" className="addplayerlabeltext">
                      HOUSE:
                    </label>
                  </div>
                  <div className="adduserdivinput">
                    <Select
                      className="addplayerdivselect"
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          console.log(selectedOption);
                          const selectedHouse = selectedOption.label;
                          setSelectedHouse(selectedHouse);
                          console.log("House:", selectedHouse);
                        }
                      }}
                      options={houses}
                    />
                  </div>
                </div>
              )}
              <div className="containeradduserform1">
                <button
                  type="button"
                  className="addplayerbutton"
                  onClick={() =>
                    handleAddUser(name, email, password, role, selectedHouse)
                  }
                >
                  ADD USER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
