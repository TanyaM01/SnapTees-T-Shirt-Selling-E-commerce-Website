import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

//where to store data that is coming from form before we submit it to the backend?
//when somebody types into the form and we want to get exactly what he is typing and put in the store through(handlechange) is gonna be a method and finally hit submit
//whatever user typing -> store into state-> pick that up and make req to backend (methods in auth->helper )

const Signup = () => {
  //state is a place where we keep up all the things and update it frm here
  const [values, setValues] = useState({
    name: "", //bydefault keep empty
    email: "",
    password: "",
    error: "",
    success: false,
  });
  //how to access these info?
  //values.name  values.email   bit much too write so destructure
  const { name, email, password, error, success } = values; //destructuring

  //higher order functions
  const handleChange = (name) => (event) => {
    //whatever comes at (name) i just want to pass it to here(event) and then do something
    setValues({ ...values, error: false, [name]: event.target.value });
    //loads existing all vals
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }) //calling signup method from helper
      .then((data) => {
        if (data.error) {
          setValues({ ...values,  error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "", //name now goes empty and everything else
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")} //this"name" gets stored in line no.21 due to event.target.value
                value={name}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                value={email}
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                value={password}
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

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. please "
            <Link to="/signin">Login here</Link>
          </div>
        </div>
      </div>
    );
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
  
  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
