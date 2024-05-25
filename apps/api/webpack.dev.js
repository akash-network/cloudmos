const path = require("path");
const { NODE_ENV = "development" } = process.env;
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const hq = require("alias-hq");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  mode: NODE_ENV,
  target: "node",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js"
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: hq.get("webpack")
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: { configFile: "tsconfig.json" }
      }
    ]
  },
  plugins: [new NodemonPlugin(), new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
  node: {
    __dirname: true
  },
  ignoreWarnings: [
    // TODO: Fix this warning at some point. Essentially webpack is warning that it is not able to resolve the dependency because it's an expression and not a string literal. This is a known issue with webpack and it's safe to ignore it for now.
    /Critical dependency: the request of a dependency is an expression/
  ]
};
