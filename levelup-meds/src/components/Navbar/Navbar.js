import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Navbar.module.scss";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = ({ navbarLinks }) => {
  const [menuClicked, setMenuClicked] = useState(false);
  const toggleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };
  return (
    <nav className={styles.Navbar}>
      <span className={styles.NavbarLogo}>LevelUp Meds</span>
      {menuClicked ? (
        <FiX
          size={25}
          className={styles.NavbarMenu}
          onClick={toggleMenuClick}
        />
      ) : (
        <FiMenu
          size={25}
          className={styles.NavbarMenu}
          onClick={toggleMenuClick}
        />
      )}
      <ul
        className={!menuClicked ? styles.NavbarList : styles.NavbarListActive}
      >
        {navbarLinks.map((item) => {
          return (
            <li className={styles.NavbarItem} key={item.title}>
              <a className={styles.NavbarLink} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
