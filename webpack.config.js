const fs = require('fs');
const pug = require('pug');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlSWebpackPlugin = require('htmls-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const defineName = ext => ext + '/[name].' + ext;
const findFileByExt = ( dir, ext ) => fs.readdirSync( dir ).find( fileName => fileName.endsWith( ext ) );

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
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
  .map( dir => findFileByExt( dir, '.js' ) )
  .map( ( item, i ) => path.join( PAGES_PATHS[i], item ) );
const PAGES = PAGES_PATHS.map( dir => findFileByExt( dir,'.pug' ) );

/**/

const PAGES__ROOT = path.join(PATHS.src, 'pages');

const defineEntriesPaths = volumePath => fs
  .readdirSync( volumePath )
  .map( chapterName => path.join( volumePath, chapterName ) )
  .map( chapterPath => /\..+$/.exec( chapterPath ) ? chapterPath : defineEntriesPaths( chapterPath ) )
  .flat()
  .filter( path => /\.js$/.exec( path ) );

const PAGES__ENTRIES = defineEntriesPaths( PAGES__ROOT );

console.log(PAGES__PATHS);



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
    filename: defineName('js'),
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
      filename: defineName('css'),
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
