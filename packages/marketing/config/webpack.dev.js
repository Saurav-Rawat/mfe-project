const { merge } = require("webpack-merge"); // merge will merge two config files.. i.e in our case the common weback file and dev webpack file
const HtmlWebpackPlugin = require("html-webpack-plugin"); // take some html file inside out project and inject script tags to with out js code
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8081/",
  },
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    // this plugin will make connection between container and remote application
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      // bellow code will help us share prod dependies between mfe and container as we dont want to load multiple same libraries
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); // as we have devConfig in second place that means it will overwrite any same property that we have in commonConfig.
