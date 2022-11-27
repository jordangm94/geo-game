import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";
import { BsFillPinMapFill } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(prev => !prev);

  const closeMobileMenu = () => setClick(false);

  return (
    <>
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
              <NavLink to="/" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}>
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

// Change h1 Logo to an image tag when we have a logo