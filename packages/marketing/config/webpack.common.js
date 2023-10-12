module.exports = {
  module: {
    rules: [
      //babel will convert es 15,16,17,18.. code to es5 code that can be executed in typical browser
      {
        test: /\.m?js$/, // this means test all files through babel which ends with mjs or js
        exclude: /node_modules/, // dont run babel on node modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"], // preset-react means babel will proces all jsx code inside our project preset-env will take all code of es15,16,17,18..ect and convert it down to es5 that can be run in typical browser
            plugins: ["@babel/plugin-transform-runtime"], // this will add aditional code to enable features like async await insude our browser
          },
        },
      },
    ],
  },
};
