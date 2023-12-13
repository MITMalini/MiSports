import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navigation-styles.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { projectFirestore } from "../components/firebase-config";
import { getDocs, query, where, collection } from "firebase/firestore";

const SideNav = () => {
  const { user } = useAuthContext();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useLogout();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          console.log("sidenav:", user.uid);
          const userUid = user.uid;
          const userCollectionRef = collection(projectFirestore, "Users");
          const data = await getDocs(
            query(userCollectionRef, where("UID", "==", userUid))
          );
          if (!data.empty) {
            const userRole = data.docs[0].data().role;
            setUserRole(userRole); // Update userRole state
            console.log(`role updated for: ${userRole}`);
          } else {
            console.error("role not found:");
          }
          setLoading(false); // Update loading state outside the if-else block
        } else {
          // console.error("User is null");
          setLoading(false); // Update loading state in case user is null
        }
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
        setLoading(false); // Update loading state in case of an error
      }
    };

    fetchData();
  }, [user]);

  const renderNavigationOptions = () => {
    const commonOptions = [
      { label: "DASHBOARD", path: "/dashboard" },
      { label: "LEADERBOARD", path: "/leaderboard" },
      { label: "UPCOMING EVENTS", path: "/viewallevents" },
      { label: "PAST EVENTS", path: "/pastevents" },
    ];
    const adminOptions = [
      { label: "ADD SPORTS", path: "/addsports" },
      { label: "ADD EVENT", path: "/addevent" },
      { label: "ADD USERS", path: "/addusers" },
    ];
    const hrOptions = [{ label: "ADD PLAYER", path: "/addplayer" }];

    if (userRole === "ADMIN") {
      return [...commonOptions, ...adminOptions];
    } else if (userRole === "HR") {
      return [...commonOptions, ...hrOptions];
    } else {
      return commonOptions;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="side-nav">
      <div className="side-nav-logo"></div>
      <div className="side-nav-options">
        <ul className="side-nav-ul">
          <div className="liDiv">
            {renderNavigationOptions().map((option, index) => (
              <li key={index}>
                <NavLink
                  to={option.path}
                  activeclassname="active"
                  className="nav-link"
                >
                  {option.label}
                </NavLink>
              </li>
            ))}
          </div>
          <div className="logoutButtonDiv">
            <button className="nav-link-button" onClick={logout}>
              LOG OUT
            </button>
          </div>
        </ul>
      </div>
      <div className="side-nav-logout"></div>
    </div>
  );
};

export default SideNav;
