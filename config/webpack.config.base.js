const threadLoader = require('thread-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = require('./paths');

// thread-loader 预热
threadLoader.warmup({}, ['babel-loader']);

module.exports = {
  entry: {
    app: './src/index.js',
    // 配置 code spliting，将这些公共的复用代码最终抽取成一个 chunk，单独打包出来
    framework: ['react', 'react-dom'],
  },
  resolve: {
    // import导入时省略后缀
    // 注意：尽可能的减少后缀尝试的可能性
    extensions: ['.js', '.jsx', '.less', '.css', '.json'],
    // 优化模块查找路径
    modules: [
      // 设置模块导入规则，import/require时会直接在这些目录找文件
      // 可以指明存放第三方模块的绝对路径，以减少寻找，
      // 默认 node_modules
      paths.COMPONENTS,
      paths.SOURCE_DIR,
      paths.NODE_MODULES_DIR,
    ],
    // import 导入时别名，减少耗时的递归解析操作
    alias: {
      '@': paths.SOURCE_DIR,
      '@components': paths.COMPONENTS,
    },
    // 有一些第三方模块会针对不同环境提供几分代码，以下为优先采用 ES6 的那份代码的配置方式
    // 默认为：['browser', 'main']
    mainFields: ['jsnext:main', 'browser', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: [
          // 创建一个 js worker 池，当项目规模较小时，建议注释掉 thread-loader，关闭该多线程打包设置
          'thread-loader',
          'babel-loader?cacheDirectory=true',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 8 * 1024, // 8Kb
          },
        },
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
            outputPath: 'font/',
          },
        },
      },
    ],
  },
  plugins: [new CopyWebpackPlugin([{ from: paths.FAVICON_ICO_PATH }])],
};
