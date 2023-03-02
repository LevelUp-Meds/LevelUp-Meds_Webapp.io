import React from "react";
import "./App.css";
import "./styles.scss";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Homepage from "./components/Homepage/Homepage";
import { AuthContext } from "./components/context/AuthContext";
import { ChatContextProvider } from "./components/context/ChatContext";
import CreateSuccess from "./components/CreateSuccess/CreateSuccess";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Calendar from "./components/Calendar/Calendar";
import Medication from "./components/Medication/Medication";
import Appointment from "./components/Appointment/Appointment";
import InboxPage from "./components/InboxPage/InboxPage";

function App() {
  return (
    <div className="App">
      <AuthContext>
        <ChatContextProvider>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/calendar" element={<Calendar />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/medication" element={<Medication />}></Route>
            <Route path="/resetpassword" element={<ResetPassword />}></Route>
            <Route path="/createsuccess" element={<CreateSuccess />}></Route>
            <Route path="/appointment" element={<Appointment />}></Route>
            <Route path="/inboxpage" element={<InboxPage />}></Route>
          </Routes>
        </ChatContextProvider>
      </AuthContext>
    </div>
  );
}

export default App;
