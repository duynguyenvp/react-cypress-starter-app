import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./contexts/AppContext";
import App from "./App";

const MOUNT_NODE = document.getElementById("app");

const ConnectedApp = ({ Component }) => (
  <React.StrictMode>
    <AppProvider>
      <Component />
    </AppProvider>
  </React.StrictMode>
);

const render = Component => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(["./App"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // eslint-disable-next-line
    const App = require("./App").App;
    render(App);
  });
}
render(App);
