import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import { useStore } from "../store/store";
type props = {
  isAuthenticated: boolean;
};

const GuestNav = () => (
  <div className={styles.linksContainer}>
    <NavLink
      to="signup"
      className={({ isActive }) => (isActive ? "active" : "inactive")}
    >
      Sign Up
    </NavLink>
    <NavLink
      to="login"
      className={({ isActive }) => (isActive ? "active" : "inactive")}
    >
      Login
    </NavLink>
  </div>
);
const UserNav = observer(() => {
  const {
    auth: { logout },
  } = useStore();
  return (
    <>
      <NavLink
        to="todos"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        my Todos
      </NavLink>
      <NavLink
        to="profile"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        my profile
      </NavLink>
      <button onClick={logout}>logout</button>
    </>
  );
});

export const Navbar = observer(({ isAuthenticated }: props) => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        Home
      </NavLink>
      {isAuthenticated ? <UserNav /> : <GuestNav />}
    </nav>
  );
});
