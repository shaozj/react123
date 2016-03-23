var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');

var dir_src = path.resolve(__dirname, 'src');
var dir_build = path.resolve(__dirname, 'build');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: path.join(__dirname, '/build')
  },
  // webpack-dev-server默认配置项，建议使用
  devServer: {
    contentBase: dir_build
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/, 
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        }
      }
    ]
  },
  // plugins: [
  //   // Avoid publishing files when compolation fails
  //   new webpack.noErrorsPlugin()
  // ],
  stats: {
    colors: true // Nice colored output
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};

