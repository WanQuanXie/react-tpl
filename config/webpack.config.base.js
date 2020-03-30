const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    // 配置 code spliting，将这些公共的复用代码最终抽取成一个 chunk，单独打包出来
    framework: ['react', 'react-dom']
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
