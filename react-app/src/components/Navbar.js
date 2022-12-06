import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Navbar.css";
import { BsFillPinMapFill } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

export default function Navbar(props) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(prev => !prev);

  const closeMobileMenu = () => setClick(false);

  const navigate = useNavigate();

  const logout = () => {
    axios.post("/api/logout", {}).then(response => {
      if (!response.data.error) {
        localStorage.removeItem('user');
        localStorage.removeItem('userID');
        props.setUser(null);
        props.setUserID(null);
        closeMobileMenu();
        navigate("/");
      }
    });
  };

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
                <NavLink to="/tutorial" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                  Tutorial
                </NavLink>
              </li>
              {!props.loggedInUser && (
                <li className="nav-item">
                  <NavLink to="/register" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                    Register
                  </NavLink>
                </li>
              )}
              {!props.loggedInUser && (
                <li className="nav-item">
                  <NavLink to="/login" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                    Log In
                  </NavLink>
                </li>
              )}
              {props.loggedInUser && (
                <li className="nav-item">
                  <NavLink to="/login" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                    Signed in as {props.loggedInUser}
                  </NavLink>
                </li>
              )}
              {props.loggedInUser && (
                <li className="nav-item">
                  <div className="nav-links logout" onClick={logout}>
                    Log Out
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};