const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}
const PAGES_DIR = `${PATHS.src}/pages/`;
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
    filename: '[name].js',
    path: PATHS.dist,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test:/\.(s*)css$/,
        use: [
          miniCss.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/inline',
      }
    ]
  },
  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./[name].${page.replace(/\.pug/,'.html')}`
    })),
    new miniCss({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      '@variables': path.resolve(__dirname, 'src/variables/variables.scss')
    }
  }
}
