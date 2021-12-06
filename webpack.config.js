const fs = require('fs');
const pug = require('pug');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlSWebpackPlugin = require('htmls-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const defineTemplate = ext => ext + '/[name].' + ext;
const defineFileName = filepath => filepath.match(/[^\\/]+$/)[0].replace(/\.js/,'');

const definePagesPaths = function definePagesPathsByRootFolder( folder ) {
  const recursiveSearch = volumePath => fs
    .readdirSync( volumePath )
    .map( chapterName => path.join( volumePath, chapterName ) )
    .flatMap( chapterPath => /\..+$/.exec( chapterPath ) ? chapterPath : recursiveSearch( chapterPath ) );

  return recursiveSearch( folder ).filter( filepath => /(?<!\.noentry)\.js$/.exec( filepath ) );
}

const defineEnrties = function convertArrayOfPathsToEntriesObject( pagesArray ) {
  const preparedArray = pagesArray
    .map( page => [ defineFileName( page ), page ] );

  return Object.fromEntries( preparedArray );
}

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  cache: path.resolve(__dirname, '.temp_cache')
};

const PAGES__ROOT = path.join(PATHS.src, 'pages');
const PAGES__FULLPATHS = definePagesPaths( PAGES__ROOT );
const PAGES__NAMES = PAGES__FULLPATHS.map( filepath => defineFileName( filepath ) );
const PAGES__ENTRIES = defineEnrties( PAGES__FULLPATHS );


console.log(PAGES__NAMES)


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

  entry: PAGES__ENTRIES,

  output: {
    filename: defineTemplate('js'),
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
    ...PAGES__NAMES.map( (pageName, index) => new HtmlWebpackPlugin({
      template: path.join( PAGES__FULLPATHS[index], `${pageName}.pug` ),
      filename: `./'${pageName}.html`,
      chunks: [ `${pageName}.js` ]
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
      filename: defineTemplate('css'),
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
    splitChunks: {
      chunks: 'all',
    },
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
      '@variables': path.join( PATHS.src, '/variables/variables.scss' ),
      '@images': path.join( PATHS.src, '/assets/images/' ),
      '@components': path.join( PATHS.src, '/components/' )
    }
  },

  resolveLoader: {
    alias: {
      'aliased-pug-loader': 'simple-pug-loader'
      //'aliased-pug-loader': '@webdiscus/pug-loader'
    }
  }
}
