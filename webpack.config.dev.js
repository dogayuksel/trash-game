const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch', './src/index'],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        loader: 'style-loader!css-loader!postcss-loader',
      },
    ],
  },
};
