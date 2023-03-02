import React, { useContext } from "react";
import auth from "../Auth/AuthProvider";
import { UserAuth } from "../context/AuthContext";
import "../../styles.scss";
import "./ChatNav.scss";

const Navbar = () => {
  const { logout } = UserAuth();
  //const { logout } = useLogout();
  const { user } = UserAuth();

  return (
    <div className="navbar">
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src={user?.photoURL} alt="" />
        <span>{user?.displayName}</span>
        <button onClick={() => logout()}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
