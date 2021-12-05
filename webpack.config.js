const fs = require('fs');
const pug = require('pug');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlSWebpackPlugin = require('htmls-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
  cache: path.resolve(__dirname, '.temp_cache')
};

const PAGES_ROOT = path.join(PATHS.src, 'pages');
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

const PAGES_PATHS = PAGES_DIRNAMES.map( dirName => path.join( PAGES_ROOT, dirName ) );
const PAGES_ENTRIES = PAGES_PATHS
  .map( dir => fs.readdirSync( dir ).find( fileName => fileName.endsWith('.js') ) )
  .map( ( item, i ) => path.join( PAGES_PATHS[i], item ) );
const PAGES = PAGES_PATHS.map( 
  dir => fs.readdirSync( dir ).find( fileName => fileName.endsWith('.pug') ) 
);

module.exports = {
  mode: 'development',

  devServer: {
    static: {
      directory: PATHS.dist
    },
    compress: true,
    port: 9000,
  },

  externals: {
    paths: PATHS
  },

  entry: PAGES_ENTRIES,

  output: {
    filename: 'index.js',
    path: PATHS.dist,
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'aliased-pug-loader',
        options: {
          root: PATHS.src,
          esModule: false
        }
      },
      {
        test:/\.(s*)css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
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
    /* html-w-p */
    ...PAGES.map( (pageName, index) => new HtmlWebpackPlugin({
      template: PAGES_PATHS[index] + pageName,
      filename: './' + pageName.replace(/\.pug/,'.html'),
      chunks: [ pageName.replace(/\.pug/,'.js') ]
    })),
    /* htmls-w-p 
    new HtmlSWebpackPlugin({
      htmls: PAGES.map( (pageName, index) => {
        const srcPath = PAGES_PATHS[index] + pageName;

        return {
          src: srcPath,
          filename: './' + pageName.replace(/\.pug/,'.html'),
          //render: () => pug.renderFile( srcPath, { basedir: PATHS.src } )
        }
      })
    }),*/
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
  ],

  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  },

  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
    cacheDirectory: PATHS.cache,
  },

  resolve: {
    alias: {
      '@variables': PATHS.src + '/variables/variables.scss',
      '@images': PATHS.src + '/assets/images/'
    }
  },

  resolveLoader: {
    alias: {
      'aliased-pug-loader': 'simple-pug-loader'
      //'aliased-pug-loader': '@webdiscus/pug-loader'
    }
  }
}
