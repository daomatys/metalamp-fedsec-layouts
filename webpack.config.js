const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}
const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs.readdirSync( PAGES_DIR ).filter( fileName => fileName.endsWith('.pug') );

module.exports = {
  mode: 'development',
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: 'index.js',
    path: PATHS.dist
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
        test: /\.(ttf|woff|svg)$/i,
        type: 'asset/resource',
        exclude: [/images/],
        generator: {
          filename: 'static/fonts/[name][ext][query]'
        }
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/i,
        type: 'asset/resource',
        include: [/images/],
        generator: {
          filename: 'static/images/[name][ext][query]'
        }
      }
    ]
  },
  plugins: [
    ...PAGES.map( page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    })),
    new miniCss({
      filename: 'index.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      '@variables': path.resolve(__dirname, 'src/variables/variables.scss')
    }
  }
}
