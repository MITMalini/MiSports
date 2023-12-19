import React, { useEffect, useState } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";
import { useLocation, useNavigate } from "react-router-dom";
import { projectFirestore } from "../components/firebase-config";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
const pointsCollectionRef = collection(projectFirestore, "Points");

const PointsPage = (props) => {
  const location = useLocation();
  const event = location.state.eventData;
  const [eventName, setEventName] = useState(
    location.state.eventData.eventName
  );
  const [date, setDate] = useState(location.state.eventData.date);
  const [eventID, setEventId] = useState(location.state.eventData.id);
  console.log(eventID);
  const [pointData, setPointData] = useState([]);
  const houseCollectionRef = collection(projectFirestore, "House");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(
          query(pointsCollectionRef, where("EventRef", "==", eventID))
        );
        const pointsData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Setting the state with the extracted data
        setPointData(pointsData);
        console.log(pointsData);
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
            <span>EVENT SCORE BOARD</span>
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
              {pointData.map((event, index) => {
                const firstPlaceHouse = event?.firstPlace?.House;
                const firstPlacePoints = event?.firstPlace?.Points;
                const secondPlaceHouse = event?.secondPlace?.House;
                const secondPlacePoints = event?.secondPlace?.Points;
                const thirdPlaceHouse = event?.thirdPlace?.House;
                const thirdPlacePoints = event?.thirdPlace?.Points;
                return (
                  <React.Fragment key={index}>
                    <div className="containeraddplayerform1">
                      <div className="addplayerdivlabel">
                        <label htmlFor="age" className="addplayerlabeltext">
                          First Place:
                        </label>
                      </div>
                      <input
                        className="viewpoints"
                        type="text"
                        id={`number-points1-${index}`}
                        value={firstPlaceHouse}
                        readOnly
                      />
                      <input
                        className="viewpoints"
                        type="number"
                        id={`number-points1-${index}`}
                        value={firstPlacePoints}
                        readOnly
                      />
                    </div>
                    <div className="containeraddplayerform1">
                      <div className="addplayerdivlabel">
                        <label htmlFor="team" className="addplayerlabeltext">
                          Second Place:
                        </label>
                      </div>
                      <input
                        className="viewpoints"
                        type="text"
                        id={`number-points2-${index}`}
                        value={secondPlaceHouse}
                        readOnly
                      />
                      <input
                        className="viewpoints"
                        type="number"
                        id={`number-points2-${index}`}
                        value={secondPlacePoints}
                        readOnly
                      />
                    </div>
                    <div className="containeraddplayerform1">
                      <div className="addplayerdivlabel">
                        <label htmlFor="team" className="addplayerlabeltext">
                          Third Place:
                        </label>
                      </div>
                      <input
                        className="viewpoints"
                        type="text"
                        id={`number-points3-${index}`}
                        value={thirdPlaceHouse}
                        readOnly
                      />
                      <input
                        className="viewpoints"
                        type="number"
                        id={`number-points3-${index}`}
                        value={thirdPlacePoints}
                        readOnly
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsPage;
