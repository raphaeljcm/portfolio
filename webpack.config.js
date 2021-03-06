const modoDev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: modoDev ? 'development' : 'production',
  entry: './scripts/main.js',
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/production'
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({})
    ]
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new TerserPlugin({
      parallel: true,
      terserOptions: {
          ecma: 6,
      },
    }),
  ],
}