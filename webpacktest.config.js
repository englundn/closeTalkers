// This file configures webpack to run on the test files
const path = require('path');
// const webpack = require('webpack');
const test = require('./test.json');

module.exports = {
  cache: true,
  entry: test,
  output: {
    path: path.join(__dirname, 'test/dist'),
    publicPath: '',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
        exclude: ['/node_modules/', '/chrome/'],
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules',
    ],
  },
};
