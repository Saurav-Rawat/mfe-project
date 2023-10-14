import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

//mount function to start the app
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// if we are in development and in isolation,
// call mount immediately
// process.env.NODE_ENV is set by webpack automatically
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");
  // passing defaultHistory as browserHistory for dev so when we run authApp standalone we can work with browser history
  if (devRoot) mount(devRoot);
}

// we are running through container
// and we should export the mount function
export { mount };
