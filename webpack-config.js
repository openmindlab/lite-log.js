const Path = require('path');
const Webpack = require('webpack');

const Package = require("./package.json");

const ENTRIES = {
  logger: "./index.js"
};

module.exports = {

  mode: 'development',

  devtool: 'eval',
  watch: true,

  entry:  ENTRIES,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },

  resolve: {
    alias: {
      Vendor: Path.resolve(__dirname, "node_modules" )
    }
  },

  plugins: [
    new Webpack.DefinePlugin({
        'process.env': {
          VERSION: `'${Package.version}'`
        }
    }),
    new Webpack.ProvidePlugin({
      'window.LOG_LEVEL': 4
    })
  ],

  output: {
    filename: "[name].dev.js",
    path: Path.resolve(__dirname, 'dist'),
    pathinfo: true,
    sourceMapFilename: "[file].js.map"
  }
};
