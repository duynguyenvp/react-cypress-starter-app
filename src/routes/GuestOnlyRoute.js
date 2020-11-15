import React, { useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export const GuestOnlyRoute = ({ Component, ...rest }) => {
  const { auth } = useContext(AppContext);

  const history = useHistory();
  if (auth && auth.token) {
    history.goBack();
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
};
