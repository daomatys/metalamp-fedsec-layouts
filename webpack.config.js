const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}
const PAGES_DIR = `${PATHS.src}/pug/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
  mode: 'development',
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: '[name].[contenthash].js',
    path: PATHS.dist,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      }
    ]
  },
  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./[name].[contenthash].${page.replace(/\.pug/,'.html')}`
    })),
    new CleanWebpackPlugin()
  ]
}
