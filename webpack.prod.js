const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  entry: './src/client/index.js',
  devtool: 'inline-source-map',
  watch: false,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/public/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['env', 'react', 'stage-3', 'es2015', 'minify'] },
        }],
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: false,
    port: 3000
  }
};