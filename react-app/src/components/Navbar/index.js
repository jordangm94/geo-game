import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";

export default function index() {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>Logo</h1>
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
          <NavLink to="/register" activeStyle>
            Register
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/login">Log In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

// Change h1 Logo to an image tag when we have a logo