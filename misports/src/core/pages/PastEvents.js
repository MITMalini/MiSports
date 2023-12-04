import React, { useEffect, useState } from "react";
import "../styles/monitor-styles.css";
import "../styles/desktop-styles.css";
import "../styles/phone-styles.css";
import SideNav from "../components/SideNav";
import { useNavigate } from "react-router-dom";
import { projectFirestore } from "../components/firebase-config";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

const PASTEVENTS = (props) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;
  const EventCollectionRef = collection(projectFirestore, "Event");
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();

  const handleAddPoints = async (event) => {
    // Get the Firestore document ID of the event
    const eventDocId = event.id;

    // Create a reference to the "Point" collection
    const teamsCollectionRef = collection(projectFirestore, "Team");

    try {
      // Check if there is already a document in "Point" collection with the same EventRef
      const pointsQuery = query(
        teamsCollectionRef,
        where("EventRef", "==", eventDocId)
      );

      const existingPoints = await getDocs(pointsQuery);

      if (existingPoints.size > 0) {
        // Points already added for this event, handle accordingly
        alert("Team already added for this event");
        navigate("/teampage", { state: { eventData: event } });
        // Optionally, you can show a message or take any other action
      } else {
        // No points added for this event, navigate to the new page
        navigate("/addpoints", { state: { eventData: event } });
      }
    } catch (error) {
      console.error("Error checking for existing points:", error.message);
      // Handle the error as needed
    }
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Firestore
        const data = await getDocs(
          query(
            EventCollectionRef,
            where("date", "<", formattedDate),
            // Only fetch events with dates in the future
            orderBy("date", "desc") // Order events by date in ascending order
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

  const formatTime = (time) => {
    const date = new Date(`2000-01-01T${time}`); // Use a common date for formatting
    const formattedTime = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    return formattedTime;
  };

  return (
    <div>
      <SideNav />
      <div className="containerDashboard1">
        <div className="containerDashboard2">
          <span className="text">
            <span>PAST EVENTS</span>
          </span>
        </div>
        <ul className="ContainerviewallEvents1">
          {currentEvents.map((event, index) => (
            <div className="mainlistdiv" key={event.id}>
              <div className="DateBox" key={`date-${event.id}`}>
                {(() => {
                  const eventDate = new Date(event.date);
                  const monthNames = [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                    "AUG",
                    "SEP",
                    "OCT",
                    "NOV",
                    "DEC",
                  ];
                  const month = monthNames[eventDate.getMonth()];
                  const day = String(eventDate.getDate()).padStart(2, "0");

                  // Apply different styles based on the month and day
                  const monthStyle = {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                    display: "flex",
                    marginBlockStart: 0,
                    marginBlockEnd: 0,
                    // Add other month styles as needed
                  };

                  const dayStyle = {
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "35px",
                    display: "flex",
                    marginBlockStart: 0,
                    marginBlockEnd: 0,
                  };

                  return (
                    <>
                      <p key={`day-${event.id}`} style={dayStyle}>
                        {day}
                      </p>
                      <p key={`month-${event.id}`} style={monthStyle}>
                        {month}
                      </p>
                    </>
                  );
                })()}
              </div>
              <div className="detailsbox">
                <li key={event.id} className="ContainerviewallEventsmain">
                  {/* Render the specific properties of each event */}
                  <div className="EventDetailsdiv">
                    <p className="eventName">{event.eventName}</p>
                    <p className="location">{event.location}</p>
                    <p className="time">
                      {formatTime(event.startTime)} -{" "}
                      {formatTime(event.endTime)}
                    </p>
                  </div>
                  <div className="ApplyButtondiv">
                    <button
                      className="applybutton"
                      onClick={() => handleAddPoints(event)}
                    >
                      ADD POINTS
                    </button>
                  </div>
                </li>
              </div>
            </div>
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

export default PASTEVENTS;
