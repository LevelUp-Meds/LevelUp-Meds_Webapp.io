import style from "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <Routes>
      <Route exact path="/" />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
