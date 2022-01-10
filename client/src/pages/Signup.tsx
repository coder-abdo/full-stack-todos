import React from "react";
import { NavLink } from "react-router-dom";

const TermsAndCondition = () => {
  return (
    <>
      <h2>
        <span className="bx bx-home-alt mx-1"></span>
        <span>Welcome to our community</span>
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quis
        dolore facilis saepe harum, accusamus asperiores vero totam nobis eum
        quod quae repellat perferendis dolorem quas ab corporis modi nisi?
      </p>
      <h4>
        <span className="bx bxs-certification mx-1"></span>
        <span>Terms and conditions</span>
      </h4>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad doloribus
        nesciunt saepe minus sed id non tempora, similique nam. Ipsum fugiat ex,
        consequuntur placeat a voluptatum ab neque? Praesentium, ipsam?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos minima iusto, ullam commodi quia distinctio dicta aperiam nostrum impedit sapiente corrupti obcaecati veritatis optio sit. Unde dicta optio aspernatur voluptates!
      </p>
      <h4>
        <span className="bx bx-help-circle mx-1"></span>
        <span>Help</span>
      </h4>
      <ul className="nav">
        <li className="nav-item">
          <NavLink to="/" className="nav-link text-muted">
            <span className="bx bx-link mx-1"></span>
            <span>Help link</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link text-muted">
            <span className="bx bx-link mx-1"></span>
            <span>Help link</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/" className="nav-link text-muted">
            <span className="bx bx-link mx-1"></span>
            <span>Help link</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};

const SignUpForm = () => {
  return (
    <div>
      <h2>User Sign Up</h2>
      <hr />
      <form action="">
        {/* name */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className="form-control form-control-sm" placeholder="Enter your name" />
        </div>
        {/* email */}
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" id="email" className="form-control form-control-sm" placeholder="Enter your email" />
        </div>
        {/* password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" className="form-control form-control-sm" placeholder="Enter your password" />
        </div>
        {/* password confirmation */}
        <div className="form-group">
          <label htmlFor="password_confirmation">Password confirm</label>
          <input type="password" name="password_confirmation" id="password_confirmation" className="form-control form-control-sm" placeholder="Re-enter password" />
        </div>
        <hr />
        {/* controllers */}
        <div className="form-group">
          <button type="button" className="btn btn-sm btn-success">
            Sign Up
          </button>
          <NavLink to="/login" className="text-decoration-none small mx-2">Already have account ?</NavLink>
        </div>
      </form>
    </div>
  )
};

export const Signup = () => {
  return (
    <>
      <div className="page-height d-flex align-items-center justify-content-center bg-white">
        <div className="row mx-auto p-2">
          <div className="col-md-6">
            <TermsAndCondition />
          </div>
          <div className="col-md-6">
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  );
};
