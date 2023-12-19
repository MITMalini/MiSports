import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./core/context/AuthContext";
import Login from "./core/pages/Login";
import Dashboard from "./core/pages/Dashboard";
import LEADERBOARD from "./core/pages/Leaderboard";
import AddPlayer from "./core/pages/AddPlayer";
import AddSport from "./core/pages/AddSports";
import AddEvent from "./core/pages/AddEvent";
import VIEWALLEVENTS from "./core/pages/ViewAllEvents";
import PASTEVENTS from "./core/pages/PastEvents";
import AddPoints from "./core/pages/AddPoints";
import PointsPage from "./core/pages/PointsPage";
import AddTeam from "./core/pages/AddTeam";
import AddUser from "./core/pages/AddUsers";
import TeamsPage from "./core/pages/TeamsPage";
import AppliedTeams from "./core/pages/ViewAppliedTeams";
import Modal from "react-modal";
import SideNav from "./core/components/SideNav";
Modal.setAppElement("#root");
const App = () => {
  return (
    <AuthContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Display SideNav only for the Home route */}
            <Route
              path="/*"
              element={
                <>
                  {<SideNav />}
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                  <Routes>
                    <Route path="/leaderboard" element={<LEADERBOARD />} />
                  </Routes>
                  <Routes>
                    <Route path="/addplayer" element={<AddPlayer />} />
                  </Routes>
                  <Routes>
                    <Route path="/addsports" element={<AddSport />} />
                  </Routes>
                  <Routes>
                    <Route path="/addevent" element={<AddEvent />} />
                  </Routes>
                  <Routes>
                    <Route path="/viewallevents" element={<VIEWALLEVENTS />} />
                  </Routes>
                  <Routes>
                    <Route path="/pastevents" element={<PASTEVENTS />} />
                  </Routes>
                  <Routes>
                    <Route path="/addpoints" element={<AddPoints />} />
                  </Routes>
                  <Routes>
                    <Route path="/addteam" element={<AddTeam />} />
                  </Routes>
                  <Routes>
                    <Route path="/pointspage" element={<PointsPage />} />
                  </Routes>
                  <Routes>
                    <Route path="/addusers" element={<AddUser />} />
                  </Routes>
                  <Routes>
                    <Route path="/teamspage" element={<TeamsPage />} />
                  </Routes>
                  <Routes>
                    <Route path="/appliedteams" element={<AppliedTeams />} />
                  </Routes>
                </>
              }
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
};

export default App;
