const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const base = require('./webpack.config.base.js');

const smp = new SpeedMeasurePlugin();

const prodWebpackConfig = merge(base, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:8].js'
  },
  optimization: {
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true
      })
    ],
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
  module: {
    rules: [
      // 针对业务代码中的 less 处理
      {
        test: /\.less$/,
        exclude: /node_modules/,
        // 对该类型的文件关闭 Tree shaking
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // 开启css module
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      // 专门针对 node_module 中的 less 处理
      {
        test: /\.less$/,
        include: /node_modules/,
        // 对该类型的文件关闭 Tree shaking
        sideEffects: true,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      // 为避免有些第三方库提供的 CSS 没有做浏览器兼容性处理，在加载 node_moduels 中的 CSS 之前还要使用 postcss-loader 再统一处理一遍，
      // 以确保所有进入生产环境的 CSS 都经过了相应的浏览器兼容性处理
      {
        test: /\.css$/,
        include: /node_modules/,
        // 对该类型的文件关闭 Tree shaking
        sideEffects: true,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      // 针对 Tree Shaking 的设置
      esModule: true,
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
});

module.exports = smp.wrap(prodWebpackConfig);
