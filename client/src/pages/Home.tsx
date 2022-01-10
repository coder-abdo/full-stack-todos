import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../store/store";

export const Home = () => {
  const User  = useSelector((state:RootState) => state.User)
  return (
    <div className="p-2">
      <p className="display-4">
        <span className="bx bx-notepad"></span>
        <span className="mx-2">Tdosy Home Page</span>
      </p>
      <div>
        {User.authenticated ? (<div>
          <p className="lead">Welcome, User</p>
        </div>) : (<div className="page-height d-flex align-items-center justify-content-center">
          <div className="alert alert-warning">
            <div className="text-center">
              <span className="bx bx-sad bx-lg"></span>
            </div>
            <p className="lead">Sorry,you must login first to show all your todos</p>
          </div>
        </div>)}
      </div>
    </div>
  );
};
