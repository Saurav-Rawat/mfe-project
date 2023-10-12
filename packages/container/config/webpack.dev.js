const { merge } = require("webpack-merge"); // merge will merge two config files.. i.e in our case the common weback file and dev webpack file
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        // the value marketing name has to match the name property that we set in remote mfe ModuleFederationPlugin name property
        // the key marketing will be used when we want to load the mfe in out container app
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      // bellow code will help us share prod dependies between mfe and container as we dont want to load multiple same libraries
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); // as we have devConfig in second place that means it will overwrite any same property that we have in commonConfig.
