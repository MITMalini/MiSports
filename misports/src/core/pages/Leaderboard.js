import React, { useEffect, useState } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";
import { projectFirestore } from "../components/firebase-config";
import { getDocs, query, collection, orderBy } from "firebase/firestore";
import goldMedalImage from "../Images/1stPlace.jpg";
import silverMedalImage from "../Images/2ndPlace.jpg";
import bronzeMedalImage from "../Images/3rdPlace.jpg";
import GRIFFINS from "../Images/GRIFFINS.png";
import HYDRA from "../Images/HYDRA.jpg";
import PEGASUS from "../Images/PEGASUS.png";
import PHOENIX from "../Images/PHOENIX.jpg";
import WEREWOLF from "../Images/WEREWOLF.jpg";
import WYVERNS from "../Images/WYVERNS.png";

const LEADERBOARD = (props) => {
  const [houses, setHouses] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const houseCollectionRef = collection(projectFirestore, "House");

  const totalPoints = houses.reduce((acc, house) => acc + house.TotalPoints, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);
        console.log("Firestore instance:", projectFirestore);

        // Fetch data from Firestore
        const data = await getDocs(
          query(houseCollectionRef, orderBy("TotalPoints", "desc"))
        );

        setHouses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsPending(false);
      } catch (error) {
        setError("Error fetching data: " + error.message);
        setIsPending(false);
      }
    };

    fetchData();
  }, []); // empty dependency array means it runs once when component mounts
  return (
    <div>
      <SideNav />
      <div className="containerDashboard1">
        <div className="containerDashboard2">
          <span className="text">
            <span>LEADERBOARD</span>
          </span>
        </div>
        <div className="containerleaderboard1">
          <div className="containerleaderboard2">
            {/* {error && <p className="error">{error}</p>} */}
            {/* {isPending === true && <p className="loading">Loading...</p>} */}
            <table className="house-list">
              {/* <thead>
                <tr>
                  <th>Place</th>
                  <th>Name</th>
                  <th>Total Points</th>
                </tr>
              </thead> */}
              <tbody>
                {houses.map((house, index) => (
                  <tr key={house.id} className="house-item">
                    <td>{index + 1}</td>
                    <td>
                      {house.Name === "WEREWOLF" ? (
                        <img
                          className="houseImage"
                          src={WEREWOLF}
                          alt="Werewolf"
                        />
                      ) : house.Name === "PHOENIX" ? (
                        <img
                          className="houseImage"
                          src={PHOENIX}
                          alt="Wyvern"
                        />
                      ) : house.Name === "PEGASUS" ? (
                        <img
                          className="houseImage"
                          src={PEGASUS}
                          alt="Pegasus"
                        />
                      ) : house.Name === "WYVERNS" ? (
                        <img
                          className="houseImage"
                          src={WYVERNS}
                          alt="WYVERNS"
                        />
                      ) : house.Name === "HYDRA" ? (
                        <img className="houseImage" src={HYDRA} alt="HYDRA" />
                      ) : house.Name === "GRIFFINS" ? (
                        <img
                          className="houseImage"
                          src={GRIFFINS}
                          alt="GRIFFINS"
                        />
                      ) : (
                        <span>{house.Name}</span>
                      )}
                    </td>
                    <td>{house.Name}</td>
                    <td>{house.TotalPoints + "/" + totalPoints}</td>
                    <td>
                      {index === 0 && (
                        <img
                          className="medalImage"
                          src={goldMedalImage}
                          alt="Gold Medal"
                        />
                      )}
                      {index === 1 && (
                        <img
                          className="medalImage"
                          src={silverMedalImage}
                          alt="Silver Medal"
                        />
                      )}
                      {index === 2 && (
                        <img
                          className="medalImage"
                          src={bronzeMedalImage}
                          alt="Bronze Medal"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LEADERBOARD;
