const preprocessor = require("cypress-react-unit-test/plugins/load-webpack");
module.exports = (on, config) => {
  config.env.webpackFilename = "webpack/client.prod.js";
  preprocessor(on, config);
  // IMPORTANT to return the config object
  return config;
};
