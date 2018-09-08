// TODO: prod config

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/, loader: "awesome-typescript-loader"
      },
      {
        test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader", options: {
              sourceMap: true
            }
          },{
            loader: "sass-loader", options: {
              sourceMap: true
            }
          }]
        })
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre", test: /\.js$/, loader: "source-map-loader"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico'
    }),
    new ExtractTextPlugin('style.css')
  ],

  mode: "development"
};