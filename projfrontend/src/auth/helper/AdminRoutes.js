/*import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() && isAuthenticated().user.role === 1 ? (
          <Component {...props}/>
        ) : (
          <Navigate
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}


export default AdminRoute;*/

import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index"; // Adjust the path as necessary

const AdminRoute = ({ element, ...rest }) => {
  return (
    isAuthenticated() && isAuthenticated().user.role === 1 ? (
      element // Render the passed component if authenticated and has admin role
    ) : (
      <Navigate
        to="/signin" // Redirect to sign-in page if not authenticated or not an admin
        state={{ from: rest.location }} // Optionally pass location state
      />
    )
  );
};

export default AdminRoute; // Export the AdminRoute component
