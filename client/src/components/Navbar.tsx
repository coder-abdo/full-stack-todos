import React from "react";
import { NavLink } from "react-router-dom";
type props = {
  isAuthenticated: boolean;
};
const GuestNav = () => (
  <>
    <li>
      <NavLink to="signup">Sign UP</NavLink>
    </li>
    <li>
      <NavLink to="login">Login</NavLink>
    </li>
  </>
);
const UserNav = () => (
  <>
    <li>
      <NavLink to="todos">my Todos</NavLink>
    </li>
    <li>
      <NavLink to="profile">my profile</NavLink>
    </li>
  </>
);

export const Navbar = ({ isAuthenticated }: props) => {
  return (
    <header>
      <div className="logo">
        <NavLink to="/">Tdosy </NavLink>
      </div>
      <nav>
        <ul>{isAuthenticated ? <UserNav /> : <GuestNav />}</ul>
      </nav>
    </header>
  );
};
