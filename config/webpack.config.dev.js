const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const paths = require('./paths');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].js'
  },
  devServer: {
    contentBase: paths.OUTPUT_DIR,
    open: true,
    port: 9000,
    compress: true,
    inline: true, // 设置热更新刷新模式为 inline
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
