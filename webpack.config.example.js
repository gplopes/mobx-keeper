/* global __dirname, require, module */
// const webpack = require('webpack');

const config = {
  entry: __dirname + '/example/example.js',
  output: {
    path: __dirname + '/example',
    filename: 'example.bundle.js'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      }
    ]
  },
};

module.exports = config;
