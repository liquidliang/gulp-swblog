var path = require('path');
var webpack = require("webpack");


module.exports = function(method) {
  var config = {
    entry: {
      index: __dirname + '/src/index.js'
    },
    resolve: {
      extensions: ['.js', '.css', '.json', '.scss'],
      alias: {
        'card': __dirname + '/src/card',
        'common': __dirname + '/src/common',
        'model': __dirname + '/src/model',
        'helper': __dirname + '/src/helper',
        'css': __dirname + '/src/css',
        'page': __dirname + '/src/page'
      }
    },
    module: {
      loaders: [{
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.js|jsx$/, //是一个正则，代表js或者jsx后缀的文件要使用下面的loader
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }]
    }
  };
  if (method == 'build') {
    config.output = {
      publicPath: "/public/cdn/",
      filename: "[name].min.js",
      chunkFilename: "discovery.chunk_[id].min.js"
    };
    config.plugins = [
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 2E4
      })
    ];
  } else {
    config.output = {
      publicPath: "/dist/",
      filename: "[name].js",
      chunkFilename: "discovery.chunk_[id].js"
    };
    config.plugins = [
      new webpack.LoaderOptionsPlugin({
        debug: true
      })
    ];
    config.devtool = "sourcemap";
  }
  return config;
};
