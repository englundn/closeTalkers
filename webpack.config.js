const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const page = require('./page.json');

module.exports = {
  cache: true,
  entry: page,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: 'js/[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: ['/node_modules/', '/chrome/'],
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
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass'),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('css/style.css', {
      allChunks: true,
    }),
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
