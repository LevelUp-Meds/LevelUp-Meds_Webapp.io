import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Homepage from "./components/Homepage/Homepage";
import { AuthContext } from "./components/context/AuthContext";
import CreateSuccess from "./components/CreateSuccess/CreateSuccess";
Auth - Feature;
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Calendar from "./components/Calendar/Calendar";
import Medication from "./components/Medication/Medication";
main;

function App() {
  return (
    <div className="App">
      <AuthContext>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          Auth-Feature
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          main
          <Route path="/register" element={<Register />}></Route>
          <Route path="/medication" element={<Medication />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="/createsuccess" element={<CreateSuccess />}></Route>
        </Routes>
      </AuthContext>
    </div>
  );
}

export default App;
