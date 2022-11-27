import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";

export default function index() {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <img src={require("../../images/logo.svg")} alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/game" activeStyle>
            Play
          </NavLink>
          <NavLink to="/leaderboard" activeStyle>
            Leaderboard
          </NavLink>
          <NavLink to="/help" activeStyle>
            Help
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/register">Register</NavBtnLink>
          <NavBtnLink to="/login">Log In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

// Change h1 Logo to an image tag when we have a logo