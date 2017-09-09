/**
 * (c) 2017 Hajime Yamasaki Vukelic
 * All rights reserved.
 */

const path = require("path");

const autoprefixer = require("autoprefixer");
const webpack = require("webpack");

module.exports = {
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
  },
  devtool: "source-map",
  entry: {
    index: [
      "es6-object-assign/auto",
      "./src",
    ],
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          "ts-loader",
          "tslint-loader",
        ],
      },
      {
        test: /.styl$/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              localIdentName: "[local]-[hash:base64:5]",
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer()],
              sourceMap: true,
            },
          },
          {
            loader: "stylus-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: "url-loader",
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules",
    ],
  },
};
