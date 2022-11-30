import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Firestore from "./createLogs"
import Read from "./Log"
import CameraDetect from "./Dash"
import Profile from "./Profile"
import Home from "./Home"

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/addlog" element={<Firestore />} />
          <Route exact path="/logs" element={<Read />} />
          <Route exact path="/dashboard" element={<CameraDetect />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;