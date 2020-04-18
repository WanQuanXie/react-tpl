const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'js/[name].[hash:8].js',
  },
  // 从配置的 Entry 文件出发，递归解析出 Entry 文件所依赖的文件，
  // 把这些依赖的文件加入到监听列表
  // 而不是直接监听项目目录下的所有文件
  // 只有在开启监听模式时，watchOptions 才有意义
  // 默认为 false，也就是不开启
  watch: true,
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    // 默认为空
    ignored: /node_modules/,
    // 在 Webpack 中监听一个文件发生变化的原理是定时的不停的去获取文件的最后编辑时间，
    // 每次都存下最新的最后编辑时间，如果发现当前获取的和最后一次保存的最后编辑时间不一致，
    // 就认为该文件发生了变化。
    // poll 就是用于控制定时检查的周期，具体含义是每隔多少毫秒检查一次
    // 默认每隔 1000 毫秒询问一次
    poll: 1000,
    // 监听到文件发生变化时，webpack 并不会立刻告诉监听者，
    // 而是先缓存起来，收集一段时间的变化后，再一次性告诉监听者
    // aggregateTimeout 就是用于配置这个等待时间，
    // 目的是防止文件更新太快导致重新编译频率太高，让程序构建卡死
    // 默认为 300ms
    aggregateTimeout: 300,
  },
  devServer: {
    contentBase: paths.OUTPUT_DIR,
    open: true,
    port: 9000,
    compress: true,
    // 默认开启 devServer.inline ）采用往开发的网页中注入代理客户端代码，通过代理客户端去刷新整个页面的原理实现网页的自动刷新。
    // 但它会向每一个 Chunk 包都注入一个代理服务器，当项目需要输出的 Chunk 有很多个时，这会导致构建缓慢
    inline: true,
    hot: true,
  },
  module: {
    rules: [
      // 针对业务代码中的 less 处理
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启css module
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      // 专门针对 node_module 中的 less 处理
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启css module
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      // 为避免有些第三方库提供的 CSS 没有做浏览器兼容性处理，在加载 node_moduels 中的 CSS 之前还要使用 postcss-loader 再统一处理一遍，
      // 以确保所有进入生产环境的 CSS 都经过了相应的浏览器兼容性处理
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 开启css module
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // 定义 NODE_ENV 环境变量为 development
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
