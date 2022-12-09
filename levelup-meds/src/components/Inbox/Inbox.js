import React from "react";
import PropTypes from "prop-types";
import styles from "./Inbox.module.scss";
import Menubar from "../Menubar/Menubar";

const Inbox = () => (
  <div className={styles.Inbox}>
    <h1>Inbox Component</h1>
  </div>
);

Inbox.propTypes = {};

Inbox.defaultProps = {};

const inboxCom = () => {
  return (
  <>
    <Menubar></Menubar>
    
    <box className={styles.Inbox}>
        <h1>Inbox Component</h1>
    
    </box>
    </>
)
}

export default inboxCom;

//export default Inbox;
