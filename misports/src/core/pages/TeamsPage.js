import React, { useEffect, useState } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";
import { useLocation, useNavigate } from "react-router-dom";
import { projectFirestore } from "../components/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthContext } from "../hooks/useAuthContext";

const TeamsPage = (props) => {
  const location = useLocation();
  const event = location.state.eventData;
  const [eventName, setEventName] = useState(
    location.state.eventData.eventName
  );
  const [error, setError] = useState(null);
  const [date, setDate] = useState(location.state.eventData.date);
  const [eventID, setEventId] = useState(location.state.eventData.id);
  const [house, setHouse] = useState(location.state.userHouse);
  const [teamData, setTeamData] = useState([]);
  const { user } = useAuthContext();
  const [userRole, setUserRole] = useState(null);
  const [userHouse, setUserHouse] = useState(null);
  const teamCollectionRef = collection(projectFirestore, "Teams");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(
          query(
            teamCollectionRef,
            where("EventData.id", "==", eventID),
            where("House", "==", house)
          )
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
  const maleParticipants = teamData[0]?.MaleParticipants;
  const femaleParticipants = teamData[0]?.FemaleParticipants;

  return (
    <div>
      <SideNav />
      <div className="containerDashboard1">
        <div className="containerDashboard2">
          <span className="text">
            <span>EVENT TEAM</span>
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
              <div className="containeraddplayerform1">
                <div className="addplayerdivlabel">
                  <label htmlFor="name" className="addplayerlabeltext">
                    House:
                  </label>
                </div>
                <input
                  className="addplayerdivinput"
                  type="text"
                  id="name"
                  name="name"
                  value={house}
                  readOnly
                />
              </div>
              <div className="viewTeam">
                <div className="addplayerdivlabel">
                  <label htmlFor="name" className="addplayerlabeltext">
                    Participants:
                  </label>
                </div>
                <div className="viewTeam1">
                  <div className="containerviewteamform1">
                    <table>
                      <thead>
                        <tr>
                          <th>Male Participants</th>
                        </tr>
                      </thead>
                      <tbody>
                        <ol className="olContainer">
                          {maleParticipants && maleParticipants.length > 0 ? (
                            maleParticipants.map((participant, index) => (
                              <li className="liContainer" key={index}>
                                {participant}
                              </li>
                            ))
                          ) : (
                            <p>No male participants</p>
                          )}
                        </ol>
                      </tbody>
                    </table>
                  </div>
                  <div className="containerviewteamform1">
                    <table>
                      <thead>
                        <tr>
                          <th>Female Participants</th>
                        </tr>
                      </thead>
                      <tbody>
                        <ol className="olContainer">
                          {femaleParticipants &&
                          femaleParticipants.length > 0 ? (
                            femaleParticipants.map((participant, index) => (
                              <li className="liContainer" key={index}>
                                {participant}
                              </li>
                            ))
                          ) : (
                            <p>No male participants</p>
                          )}
                        </ol>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
