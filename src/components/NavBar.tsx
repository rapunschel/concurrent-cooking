import { NavLink } from "react-router";

export function NavBar() {
  return (
    <nav>
      <NavLink to="/intro" end>
        intro
      </NavLink>
      <NavLink to="/terminal">terminal</NavLink>
      <NavLink to="/docs" end>
        docs
      </NavLink>
    </nav>
  );
}
