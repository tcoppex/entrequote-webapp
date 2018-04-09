const path = require('path')
const webpack = require('webpack')

const SOURCE_DIR = './resources/assets/js';
const ROOT_DIR = './public';
const BUILD_DIR = `${ROOT_DIR}/js`;

module.exports = {
  // Application entrypoints.
  entry: {
    index: `./${SOURCE_DIR}/main.js`,
    thirdparties: ['vue', 'axios']
  },

  output: {
    path: path.resolve(__dirname, BUILD_DIR),
    filename: '[name].js',
    publicPath: `${ROOT_DIR}`
  },

  module: {
    rules: [
      // Transform javascript from ES6 to vanilla js.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // Import file containing CSS.
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      // Import Vue Component file.
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      // Import image
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  
  // In the case we want to use Vue as a standalone build (with template compiler).
  resolve: {
    alias: {
      'vue$' : 'vue/dist/vue.common.js'
    }
  },

  // Pack as one file our thirdparties.
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "thirdparties",
          chunks: "all"
        }
      }
    }
  },
}

// Minification
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}