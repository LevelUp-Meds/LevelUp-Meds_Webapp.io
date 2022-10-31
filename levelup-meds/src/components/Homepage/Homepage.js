import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { AuthContext } from "../contexts/AuthProvider";
import "./Homepage.module.scss";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";

function Homepage() {
  return <div>Home Page</div>;
}

export default Homepage;
