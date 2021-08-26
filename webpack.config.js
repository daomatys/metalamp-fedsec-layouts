const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', 
  entry: {
    pug: './src/index.pug',
  }
  output: {
    filename: '[name].bundle.pug',
    path: path.resolve(__dirname, 'dist')
  }
}



