import React from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import styles from "./navbar.module.css";
import { useStore } from "../store/store";
type props = {
  isAuthenticated: boolean;
};
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #11bdff;
  color: #fff;
  padding: 1rem;
  a {
    font-size: 1.6rem;
    color: #fff;
    .active {
      color: #fab;
    }
  }
`;
const LogoutBtn = styled.button`
  border: none;
  color: #11bdff;
  font-size: 1.6rem;
  outline: none;
  cursor: pointer;
  background-color: #fff;
  padding: 1rem 2rem;
`;
const LinksContainer = styled.div`
  display: flex;
`;
const GuestNav = () => (
  <LinksContainer>
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
  </LinksContainer>
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
      <LogoutBtn onClick={logout}>logout</LogoutBtn>
    </>
  );
});

export const Navbar = observer(({ isAuthenticated }: props) => {
  return (
    <Nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        Home
      </NavLink>
      {isAuthenticated ? <UserNav /> : <GuestNav />}
    </Nav>
  );
});
