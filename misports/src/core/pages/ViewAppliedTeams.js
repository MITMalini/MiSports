import React, { useEffect, useState } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";
import { useLocation, useNavigate } from "react-router-dom";
import { projectFirestore } from "../components/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthContext } from "../hooks/useAuthContext";

const AppliedTeams = (props) => {
  const location = useLocation();
  const [eventName, setEventName] = useState(
    location.state.eventData.eventName
  );
  const [error, setError] = useState(null);
  const [date, setDate] = useState(location.state.eventData.date);
  const [eventID, setEventId] = useState(location.state.eventData.id);
  const [house, setHouse] = useState(location.state.userHouse);
  const [teamData, setTeamData] = useState([]);
  const teamCollectionRef = collection(projectFirestore, "Teams");
  const navigate = useNavigate();

  const handleViewTeams = (team) => {
    navigate("/teamspage", {
      state: {
        eventData: location.state.eventData,
        userHouse: team.House,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(
          query(teamCollectionRef, where("EventData.id", "==", eventID))
        );
        const teamsData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Setting the state with the extracted data
        setTeamData(teamsData);
        console.log(teamsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      <SideNav />
      <div className="containerDashboard1">
        <div className="containerDashboard2">
          <span className="text">
            <span>EVENT TEAMS</span>
          </span>
        </div>
        <div className="containerviewPlayer">
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
              defaultValue={eventName}
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
              defaultValue={date}
              readOnly
            />
          </div>
        </div>
        <div className="containerDashboard2">
          <span className="text-sub">
            <span>APPLIED TEAMS</span>
          </span>
        </div>
        <div className="button-container">
          {teamData.map((team, index) => (
            <button
              className="viewappliedTeamsbutton"
              key={index}
              onClick={() => handleViewTeams(team)}
            >
              {team.House}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedTeams;
