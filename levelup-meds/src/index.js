import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyBBl1OjSS1ySiSw1_D0h1UZgZx73C6q-e0",
//   authDomain: "levelup-meds-aa820.firebaseapp.com",
//   projectId: "levelup-meds-aa820",
//   storageBucket: "levelup-meds-aa820.appspot.com",
//   messagingSenderId: "267496574069",
//   appId: "1:267496574069:web:20cbc5bca6703506183c3c",
//   measurementId: "G-8EVDJ3EQXG"
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
