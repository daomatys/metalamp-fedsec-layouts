const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


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
  'ui-kit/__headers-n-footers/',
  'website/__landing/',
  'website/__login/',
  'website/__no-page/',
  'website/__registration/',
  'website/__room/',
  'website/__search/',
];

const PAGES_DIR = PAGES_DIRNAMES.map( dirName => PAGES_ROOT + dirName );
const PAGES = PAGES_DIR.map( 
  dir => fs.readdirSync( dir ).find( fileName => fileName.endsWith('.pug') ) 
);

module.exports = {
  mode: 'development',

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },

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
          root: path.resolve(__dirname, 'src'),
          pretty: false
        }
      },
      {
        test:/\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    new CssMinimizerPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    //new CleanWebpackPlugin()
  ],

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },

  resolve: {
    alias: {
      '@variables': path.resolve(__dirname, 'src/variables/variables.scss'),
      '@images': path.resolve(__dirname, 'src/assets/images/')
    }
  }
}
