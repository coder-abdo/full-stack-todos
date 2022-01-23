import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../store/store";
export const Signup = observer(() => {
  const {
    auth: { signup, message, state },
  } = useStore();
  const [signupData, setSignupData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(signupData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {state === "failed" && <p>{message}</p>}
      {state === "success" && <Navigate to="/login" replace={true} />}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={signupData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={signupData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={signupData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">signup</button>
    </form>
  );
});
