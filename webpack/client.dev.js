const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");

const {
  entries,
  fileManagerPlugin,
  htmlWebpackPlugins,
  resolve
} = require("./client.common");

const styleFormats = /\.(css|less|styl|scss|sass|sss)$/;
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
  output: {
    filename: "[name].js",
    chunkFilename: "[id].js",
    path: path.resolve(__dirname, "../build/dist/"),
    publicPath: "/"
  },
  entry: entries,
  module: {
    rules: [
      {
        test: styleFormats,
        rules: [
          {
            test: styleFormats,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
              {
                loader: "sass-resources-loader",
                options: {
                  resources: [
                    path.resolve(__dirname, "../src/assets/variables.scss")
                  ]
                }
              }
            ],
            sideEffects: true
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(jpg|svg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          fallback: "file-loader",
          limit: 1024
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({ analyzerPort: 9999 }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.ProvidePlugin({
      React: "react"
    }),
    new WebpackAssetsManifest({
      output: "assets.json",
      entrypoints: true,
      entrypointsKey: "entryPoints"
    }),
    fileManagerPlugin
  ].concat(htmlWebpackPlugins),
  devServer: {
    contentBase: path.join(__dirname, "../build/"),
    index: "home.html",
    open: true,
    hot: true,
    compress: true,
    port: 9000,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  resolve
};
