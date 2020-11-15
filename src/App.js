import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import "./assets/root.scss";

import Loading from "./components/Loading/Loading";
import Home from "./pages/Home";
import { GuestOnlyRoute } from "./routes/GuestOnlyRoute";
import { PrivateRoute } from "./routes/PrivateRoute";

const App = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Home} />
          <GuestOnlyRoute exact path="/guest" component={Home} />
          <PrivateRoute exact path="/private" component={Home} />
        </Switch>
      </div>
    </Suspense>
  </Router>
);

export default App;
