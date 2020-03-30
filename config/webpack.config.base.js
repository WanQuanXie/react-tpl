const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    // 配置 code spliting，将这些公共的复用代码最终抽取成一个 chunk，单独打包出来
    framework: ['react', 'react-dom']
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
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
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
