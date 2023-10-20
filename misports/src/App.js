import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./core/pages/Login";
import Dashboard from "./core/pages/Dashboard";
// import SideNav from "./core/components/SideNav";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Display SideNav only for the Home route */}
          <Route
            path="/home/*"
            element={
              <>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
