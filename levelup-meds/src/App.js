import style from "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage/Homepage";
import Menubar from "./components/Menubar/Menubar";
//import firebase from "firebase";

function App() {
  return (
    <Routes>
      <Route exact path="/" />
      <Route path="/login" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/menubar" element={<Menubar />} />
    </Routes>
  );
}

export default App;
