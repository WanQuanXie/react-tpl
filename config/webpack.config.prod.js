const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.config.base.js');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    })
  ]
});
