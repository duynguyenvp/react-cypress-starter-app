import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { AppContext } from "../contexts/AppContext";

export const PrivateRoute = ({ Component, ...rest }) => {
  const { auth } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={props =>
        auth && auth.token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
