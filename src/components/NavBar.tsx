import { NavLink } from "react-router";

export function NavBar() {
  return (
    <nav>
      <NavLink to="/" end>
        about
      </NavLink>
      <NavLink to="/terminal">terminal</NavLink>
      <NavLink to="/introduction" end>
        intro
      </NavLink>
    </nav>
  );
}
