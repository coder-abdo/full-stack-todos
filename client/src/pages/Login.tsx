import React from "react";
import { NavLink } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <div className="page-height d-flex align-items-center justify-content-center">
        <div className="shadow p-3 rounded bg-white">
          <p className="display-4 text-primary">
            <span className="bx bx-user-circle"></span>
            <span>Users Login</span>
          </p>
          {/* email  */}
          <div className="form-group">
            <label htmlFor="email">
              <span className="bx bx-envelope mx-1"></span>
              <span>E-mail</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control form-control-sm"
              placeholder="Enter your email address"
            />
          </div>
          {/* end email */}
          {/* password */}
          <div className="form-group">
            <label htmlFor="password">
              <span className="bx bx-lock mx-1"></span>
              <span>Password</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control form-control-sm"
              placeholder="Enter your password"
            />
          </div>
          {/* end password */}
          <hr />
          {/* controllers */}
          <div className="form-group">
            <button className="btn btn-sm btn-primary">
              <span>Login</span>
              <span className="bx bx-log-in-circle bx-xs mx-1"></span>
            </button>

            <a href="" className="text-decoration-none small mx-2">
              forget password ?
            </a>
            <hr />
            <div className="text-center">
            <NavLink to="/signup" className="btn btn-sm btn-success small">
              <span className="bx bxs-user-plus"></span>
              <span className="mx-2">Sign up</span>
            </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
