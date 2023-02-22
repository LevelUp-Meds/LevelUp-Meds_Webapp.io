import React from "react";
import Map from "../Map/Map";
import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {
  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  };
  return (
    <div className={styles.ResetPassword}>
      <Map location={location} zoomLevel={17}></Map>
    </div>
  );
};

export default ResetPassword;
