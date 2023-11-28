import React, { useEffect, useState } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";
import { projectFirestore } from "../components/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const VIEWALLEVENTS = (props) => {
  const [events, setEvents] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const EventCollectionRef = collection(projectFirestore, "Event");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);
        console.log("Firestore instance:", projectFirestore);
        // Fetch data from Firestore
        const data = await getDocs(EventCollectionRef);
        setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        setIsPending(false);
      } catch (error) {
        setError("Error fetching data: " + error.message);
        setIsPending(false);
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
            <span>VIEW ALL EVENTS</span>
          </span>
        </div>
        <div>
          {/* {error && <p className="error">{error}</p>} */}
          {/* {isPending === true && <p className="loading">Loading...</p>} */}

          {/* Render the data */}
          <ul className="event-list">
            {events.map((event) => (
              <li key={event.id} className="event-item">
                {/* Render the specific properties of each event */}
                {event.sport} - {event.eventName} - {event.totalPoints}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VIEWALLEVENTS;
