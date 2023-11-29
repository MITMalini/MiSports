import React, { useEffect, useState } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";
import { projectFirestore } from "../components/firebase-config";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

const VIEWALLEVENTS = (props) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;
  const EventCollectionRef = collection(projectFirestore, "Event");
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Firestore
        const data = await getDocs(
          query(
            EventCollectionRef,
            // Only fetch events with dates in the future
            orderBy("date", "asc") // Order events by date in ascending order
          )
        );

        // Update the state only if there is data
        setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  };

  return (
    <div>
      <SideNav />
      <div className="containerDashboard1">
        <div className="containerDashboard2">
          <span className="text">
            <span>VIEW ALL EVENTS</span>
          </span>
        </div>
        <ul className="ContainerviewallEvents1">
          {currentEvents.map((event) => (
            <li key={event.id} className="ContainerviewallEventsmain">
              {/* Render the specific properties of each event */}
              {event.sport} - {event.eventName} - {event.date}
            </li>
          ))}
        </ul>
        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(events.length / eventsPerPage) }).map(
            (item, index) => (
              <button
                key={index}
                className={`paginationbutton ${
                  activePage === index + 1 ? "active" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default VIEWALLEVENTS;
