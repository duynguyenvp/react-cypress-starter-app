const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const TerserPlugin = require("terser-webpack-plugin");

const {
  entries,
  fileManagerPlugin,
  resolve,
  htmlWebpackPlugins
} = require("./client.common");

const styleFormats = /\.(css|less|styl|scss|sass|sss)$/;
module.exports = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[id].[contenthash].js",
    path: path.resolve(__dirname, "../build/dist/"),
    publicPath: "/dist/"
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
        use: {
          loader: "babel-loader"
        }
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    new webpack.ProvidePlugin({
      React: "react"
    }),
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
    new WebpackAssetsManifest({
      output: "assets.json",
      entrypoints: true,
      entrypointsKey: "entryPoints"
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: "../sw.js",
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 5000000,
      runtimeCaching: [
        {
          urlPattern: new RegExp("^https://(.*).fbcdn.net/(.*)"),
          handler: "CacheFirst"
        },
        {
          urlPattern: new RegExp(
            "^https://fonts.(?:googleapis|gstatic).com/(.*)"
          ),
          handler: "CacheFirst"
        }
      ]
    }),
    fileManagerPlugin
  ].concat(htmlWebpackPlugins),
  optimization: {
    usedExports: true,
    moduleIds: "hashed",
    runtimeChunk: "single",
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: false
          }
        },
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          // can be used in chunks array of HtmlWebpackPlugin
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          maxSize: 256 * 1000
        },
        common: {
          test: /[\\/]src[\\/]components[\\/]/,
          chunks: "all",
          minSize: 0
        }
      }
    }
  },
  resolve
};
