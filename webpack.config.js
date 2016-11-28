const webpack = require('webpack');
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
          compact: false,
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('css/style.css', {
      allChunks: true,
    }),
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules',
    ],
  },
};
