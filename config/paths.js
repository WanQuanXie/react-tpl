const path = require('path');

module.exports = {
  SOURCE_DIR: path.resolve(__dirname, '../src'),
  OUTPUT_DIR: path.resolve(__dirname, '../dist'),
  NODE_MODULES_DIR: path.resolve(__dirname, '../node_modules'),
  FAVICON_ICO_PATH: path.resolve(__dirname, '../public/favicon.ico'),
  ICON_PATH: path.resolve(__dirname, '../public/icon.png'),
  MANIFEST_PATH: path.resolve(__dirname, '../public/manifest.json'),
  SW_PATH: path.resolve(__dirname, '../src/sw.js'),
  HTML_TEMPLATE_PATH: path.resolve(__dirname, '../public/index.html'),
  PUBLIC_PATH: process.env.PUBLIC_PATH || '/',
  cacheDirectory: path.join(__dirname, '../.cache/hard-source/[confighash]'),
  COMPONENTS: path.resolve(__dirname, `../src/components/`)
};
