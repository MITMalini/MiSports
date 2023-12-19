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
  const maleParticipantsH1 = teamData[0]?.MaleParticipants;
  const femaleParticipantsH1 = teamData[0]?.FemaleParticipants;
  const House1 = teamData[0]?.House;
  const maleParticipantsH2 = teamData[1]?.MaleParticipants;
  const femaleParticipantsH2 = teamData[1]?.FemaleParticipants;
  const House2 = teamData[1]?.House;
  const maleParticipantsH3 = teamData[2]?.MaleParticipants;
  const femaleParticipantsH3 = teamData[2]?.FemaleParticipants;
  const House3 = teamData[2]?.House;
  const maleParticipantsH4 = teamData[3]?.MaleParticipants;
  const femaleParticipantsH4 = teamData[3]?.FemaleParticipants;
  const House4 = teamData[3]?.House;
  const maleParticipantsH5 = teamData[4]?.MaleParticipants;
  const femaleParticipantsH5 = teamData[4]?.FemaleParticipants;
  const House5 = teamData[4]?.House;
  const maleParticipantsH6 = teamData[5]?.MaleParticipants;
  const femaleParticipantsH6 = teamData[5]?.FemaleParticipants;
  const House6 = teamData[5]?.House;

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
        <div className="grid-container">
          {teamData.map((team, index) => (
            <div key={index} className="grid-item">
              <p className="House-Name">{team?.House}</p>
              <table>
                <thead>
                  <tr>
                    <th>Male Participants</th>
                    <th>Female Participants</th>
                  </tr>
                </thead>
                <tbody>
                  {team?.MaleParticipants.map((maleParticipant, index) => (
                    <tr key={index}>
                      <td>{maleParticipant}</td>
                      {/* Render corresponding Female Participant, or an empty cell if not available */}
                      <td>{team?.FemaleParticipants[index] || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedTeams;
