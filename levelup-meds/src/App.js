import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage/Homepage";
import Menubar from "./components/Menubar/menubar";
import LevelUpMedsCalendar from "./components/calendar/Calendar";

function App() {
  return (
    <Routes>
      <Route exact path="/" />
      <Route path="/Login" element={<Login />} />
      <Route path="/Homepage" element={<Homepage />} />
      <Route path="/Menubar" element={<Menubar />} />
      <Route path="/Calendar" element={<LevelUpMedsCalendar />} />
    </Routes>
  );
}

export default App;
