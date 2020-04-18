const threadLoader = require('thread-loader');

// thread-loader 预热
threadLoader.warmup({}, ['babel-loader']);

module.exports = {
  entry: {
    app: './src/index.js',
    // 配置 code spliting，将这些公共的复用代码最终抽取成一个 chunk，单独打包出来
    framework: ['react', 'react-dom'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: [
          // 创建一个 js worker 池，当项目规模较小时，建议注释掉 thread-loader，关闭该多线程打包设置
          'thread-loader',
          'babel-loader',
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
};
