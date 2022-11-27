import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";
import { BsFillPinMapFill } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

export default function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(prev => !prev);

  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <BsFillPinMapFill className="navbar-icon" />
              GlobeHunch
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"} >
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/game" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                  Play
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/leaderboard" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/help" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                  Help
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                  Log In
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

// Change h1 Logo to an image tag when we have a logo