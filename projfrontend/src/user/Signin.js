import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';

import { signin, authenticate, isAuthenticated } from "../auth/helper";
//              middleware     checker

const Signin = () => {
  const [values, setValues] = useState({
    email: "a@hitesh.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false, //if user is successfully able to sign in we need to redirect it to his user dashboard
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    //whatever comes at (name) i just want to pass it to here(event) and then do something
    setValues({ ...values, error: false, [name]: event.target.value });
    //loads existing all vals
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      //.catch(console.log("signin request failed", error));
      .catch((err) => console.log("Signin request failed:", err));

  };

  const performRedirect = () => {
    
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;;
      }
    }
    if (isAuthenticated()) {
      return <Navigate to="/" />;  //to home
    }
  };
  

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    )
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
