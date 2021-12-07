const fs = require('fs');
const pug = require('pug');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const HtmlSWebpackPlugin = require('htmls-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');

const defineTemplate = ext => ext + '/[name].' + ext;
const defineFileName = filepath => filepath.match(/[^\\/]+$/)[0].replace(/\.js$/,'');

const definePagesPaths = function definePagesPathsByRootFolder( folder ) {
  const recursiveSearch = volumePath => fs
    .readdirSync( volumePath )
    .map( chapterName => path.join( volumePath, chapterName ) )
    .flatMap( chapterPath => /\..+$/.exec( chapterPath ) ? chapterPath : recursiveSearch( chapterPath ) );

  return recursiveSearch( folder ).filter( filepath => /(?<!\.noentry)\.js$/.exec( filepath ) );
}

const defineEntryPoints = function convertArrayOfPathsIntoEntriesObject( pagesArray ) {
  const preparedArray = pagesArray
    .map( page => [ defineFileName( page ), [ page, page.replace(/\.js$/,'.scss') ] ] );

  return Object.fromEntries( preparedArray );
}

const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
  cache: path.resolve(__dirname, './.temp_cache')
};

const PAGES__ROOT = path.join(PATHS.src, 'pages');
const PAGES__FULLPATHS = definePagesPaths( PAGES__ROOT );
const PAGES__NAMES = PAGES__FULLPATHS.map( filepath => defineFileName( filepath ) );
const PAGES__ENTRIES = defineEntryPoints( PAGES__FULLPATHS );

module.exports = {
  devServer: {
    static: {
      directory: PATHS.dist
    },
    compress: true,
    port: 9000,
    watchContentBase: true
  },

  mode: 'development',

  entry: PAGES__ENTRIES,
  //entry: path.join(PATHS.src, 'index.js'),

  output: {
    //filename: 'index.js',
    filename: defineTemplate('js'),
    path: PATHS.dist,
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
      {
        test: /\.pug$/i,
        loader: 'aliased-pug-loader',
        options: {
          root: PATHS.src,
          pretty: true
        }
      },
      {
        test:/\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          }
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
    new HtmlWebpackInjector(),
    /* html-w-p */
    ...PAGES__NAMES.map( (pageName, index) => new HtmlWebpackPlugin({
      template: PAGES__FULLPATHS[index].replace(/\.js$/,'.pug'),
      filename: `./${pageName}.html`,
      chunks: [ `${pageName}.js` , `${pageName}.scss` ],
    })),
    /* htmls-w-p 
    new HtmlSWebpackPlugin({
      htmls: PAGES__NAMES.map( (pageName, index) => {
        const srcPath = PAGES__FULLPATHS[index].replace(/\.js$/,'.pug');

        return {
          src: srcPath,
          filename: `./${pageName}.html`,
          chunks: [ `${pageName}.js` ],
          //render: () => pug.renderFile( srcPath, { basedir: PATHS.src } )
        }
      })
    }),*/
    /*new HtmlWebpackInjectPreload({
      files: [
        {
          match: /\.(s*)css$/i,
          attributes: {
            as: 'style',
          },
        }
      ]
    }),*/
    new MiniCssExtractPlugin({
      //filename: 'index.css',
      filename: defineTemplate('css'),
      chunkFilename: defineTemplate('css'),
      ignoreOrder: true
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
      new CssMinimizerPlugin({
        exclude: /node_modules/,
      }),
    ]
  },

  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
    cacheDirectory: PATHS.cache,
  },

  resolve: {
    alias: {
      '@variables':  path.join( PATHS.src, '/variables/variables.scss' ),
      '@components': path.join( PATHS.src, '/components/' ),
      '@images': path.join( PATHS.src, '/assets/images/' )
    }
  },

  resolveLoader: {
    alias: {
      'aliased-pug-loader': 'simple-pug-loader'
      //'aliased-pug-loader': '@webdiscus/pug-loader',
    }
  }
}
