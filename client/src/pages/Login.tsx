import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store";
import { Navigate } from "react-router-dom";
export const Login = observer(() => {
  const {
    auth: { login, message, isAuthenticated, state },
  } = useStore();
  const [loginData, setLoginData] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginData);
  };
  return (
    <form className="flex" onSubmit={handleSubmit}>
      {state === "failed" && <p>{message}</p>}
      {isAuthenticated && <Navigate to="/" replace={true} />}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={loginData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          value={loginData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
});
