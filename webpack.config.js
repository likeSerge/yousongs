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
    contentBase: './dist'
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
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new ExtractTextPlugin('style.css')
  ],

  mode: "development"
};