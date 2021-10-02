const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
};

const PAGES_ROOT = PATHS.src + '/pages/';
const PAGES_DIRNAMES = [
  'index/',
  'ui-kit/__cards/',
  'ui-kit/__colors-n-type/',
  'ui-kit/__form-elements/',
  'ui-kit/__headers-n-footers/'
];

const PAGES_DIR = PAGES_DIRNAMES.map( dirName => PAGES_ROOT + dirName );
const PAGES = PAGES_DIR.map( dir => fs.readdirSync( dir ).find( fileName => fileName.endsWith('.pug') ) );

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
    ...PAGES.map( (page, index) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR[index]}/${page}`,
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
      '@variables': path.resolve(__dirname, 'src/variables/variables.scss'),
      '@images': path.resolve(__dirname, 'src/assets/images/')
    }
  }
}
