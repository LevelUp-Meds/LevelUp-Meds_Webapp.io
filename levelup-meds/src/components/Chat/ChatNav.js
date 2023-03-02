import React, { useContext } from "react";
import auth from "../Auth/AuthProvider";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = UserAuth();
  //const { logout } = useLogout();
  const { user } = UserAuth();

  return (
    <div className="navbar">
      <span className="logo">Inbox</span>
      <div className="user">
        {/* <img src={user?.photoURL} alt="" />
        <span>{user?.displayName}</span> */}
      </div>
    </div>
  );
};

export default Navbar;
