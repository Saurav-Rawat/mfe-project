import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//mount function to start the app
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

// if we are in development and in isolation,
// call mount immediately
// process.env.NODE_ENV is set by webpack automatically
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) mount(devRoot);
}

// we are running through container
// and we should export the mount function
export { mount };
