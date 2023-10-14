import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

//mount function to start the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  // whenever there is change in route history function will call any function that we will provide to listen
  if (onNavigate) history.listen(onNavigate);
  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      // setting authApp(remotes) memory history
      const { pathname } = history.location;
      // without the bellow condition we will endup in a loop where on changing ones history
      // router of remote and container will keep updating history infinitly
      if (pathname !== nextPathname) history.push(nextPathname);
    },
  };
};

// if we are in development and in isolation,
// call mount immediately
// process.env.NODE_ENV is set by webpack automatically
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  // passing defaultHistory as browserHistory for dev so when we run authApp standalone we can work with browser history
  if (devRoot) mount(devRoot, { defaultHistory: createBrowserHistory() });
}

// we are running through container
// and we should export the mount function
export { mount };
