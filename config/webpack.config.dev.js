const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const paths = require('./paths');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'js/[name].[hash:8].js',
  },
  devServer: {
    contentBase: paths.OUTPUT_DIR,
    open: true,
    port: 9000,
    compress: true,
    inline: true, // 设置热更新刷新模式为 inline
    hot: true,
  },
  module: {
    rules: [
      // 针对业务代码中的 less 处理
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      // 专门针对 node_module 中的 less 处理
      {
        test: /\.less$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      // 为避免有些第三方库提供的 CSS 没有做浏览器兼容性处理，在加载 node_moduels 中的 CSS 之前还要使用 postcss-loader 再统一处理一遍，
      // 以确保所有进入生产环境的 CSS 都经过了相应的浏览器兼容性处理
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
