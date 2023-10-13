const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    // this will make sure whenever we are building files for production it will use the bellow template
    filename: "[name].[contenthash].js",
    // public path option will be used whenever some part of webpack trying to refer to some part of file built by webpack. previously html webpack plugin
    // was trying to refer directly file name i.e(cloudFrontUrl/filename) but in aws s3 we have folder structure /container/latest/ for our mfe so public
    // path will prepend while creating file name and we'll get correct public path
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
