import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./core/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
