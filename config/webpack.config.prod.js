const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.config.base.js');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].js'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    // runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      // 定义了需要被抽离的模块，其中 test 属性是比较关键的一个值，他可以是一个字符串，也可以是正则表达式，还可以是函数。
      // 如果定义的是字符串，会匹配入口模块名称，会从其他模块中把包含这个模块的抽离出来。name 是抽离后生成的名字，和入口文件模块名称相同
      cacheGroups: {
        framework: {
          test: 'framework',
          name: 'framework',
          enforce: true
        },
        vendors: {
          priority: -10,
          test: /node_modules/,
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    })
  ]
});
