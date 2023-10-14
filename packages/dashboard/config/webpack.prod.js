const { merge } = require("webpack-merge"); // merge will merge two config files.. i.e in our case the common weback file and dev webpack file
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const prodConfig = {
  mode: "production",
  output: {
    // this will make sure whenever we are building files for production it will use the bellow template
    filename: "[name].[contenthash].js",
    // public path option will be used whenever some part of webpack trying to refer to some part of file built by webpack. previously html webpack plugin
    // was trying to refer directly file name i.e(cloudFrontUrl/filename) but in aws s3 we have folder structure /container/latest/ for our mfe so public
    // path will prepend while creating file name and we'll get correct public path
    publicPath: "/dashboard/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
