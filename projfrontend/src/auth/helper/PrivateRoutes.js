/*import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated() ? (
          element
        ) : (
          <Navigate
            to={{
              pathname: "/signin",
              state: { from: rest.location },
            }}
          />
        )
      }
    />
  );
}


export default PrivateRoute;*/


/*
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index"; // Adjust the path as necessary

const PrivateRoute = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated() ? (
          element // Render the passed component if authenticated
        ) : (
          <Navigate
            to="/signin" // Redirect to sign-in page if not authenticated
            state={{ from: rest.location }} // Optionally pass location state
          />
        )
      }
    />
  );
};

export default PrivateRoute; // Export the PrivateRoute component
*/

/*
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index"; // Adjust the path as necessary

const PrivateRoute = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated() ? (
          element // Render the passed component if authenticated
        ) : (
          <Navigate
            to="/signin" // Redirect to sign-in page if not authenticated
            state={{ from: rest.location }} // Optionally pass location state
          />
        )
      }
    />
  );
};

export default PrivateRoute; // Export the PrivateRoute component
*/


import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index"; // Adjust the path as necessary

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

export default PrivateRoute; // Export the PrivateRoute component

