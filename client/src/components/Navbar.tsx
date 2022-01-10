import React from "react";
import { NavLink } from "react-router-dom";
type props = {
  isAuthenticated: boolean;
};

/**
 * Guest user navbar
 * that will be shown if user is not logged in
 * @returns 
 */
const GuestNav = () => (
  <>
    <li className="nav-item">
      <NavLink className="nav-link small text-light" to="signup">
        <span>Sign Up</span>
        <span className="bx bx-user-plus bx-xs mx-1"></span>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link small text-light" to="login">
        <span>Login</span>
        <span className="bx bx-log-in-circle bx-xs"></span>
      </NavLink>
    </li>
  </>
);

/**
 * authenticated user navbar
 * 
 * @returns 
 */
const UserNav = () => (
  <>
    <li className="nav-item">
      <NavLink className="nav-link small text-light" to="todos">my Todos</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link small text-light" to="profile">my profile</NavLink>
    </li>
  </>
);

/**
 * App navbar
 * 
 * @param props 
 * @returns 
 */
export const Navbar = ({ isAuthenticated }: props) => {
  return (
    <header className="bg-primary shadow">
      <div className="navbar navbar-expand-md navbar-dark">
        <div className="logo navbar-brand">
          <NavLink to="/" className="nav-link text-light">
            <span className="bx bx-notepad"></span>
            <span>Tdosy</span>
          </NavLink>
        </div>
        <nav className="navbar-collapse collapse">
          <ul className="navbar-nav ml-auto">{isAuthenticated ? <UserNav /> : <GuestNav />}</ul>
        </nav>
      </div>
    </header>
  );
};
