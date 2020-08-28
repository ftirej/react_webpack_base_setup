const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = merge(common.config, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          common.CSSLoader,
          common.PostCSSLoader,
          'sass-loader',
        ],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          common.CSSLoader,
          common.PostCSSLoader,
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    writeToDisk: true,
    compress: true,
    inline: true,
    port: 3000,
    // publicPath: common.basePath,
    historyApiFallback: true,
    open: true,
    // openPage: common.basePath.replace(/^\//, ''),
    hot: true,
    progress: true,
    overlay: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // proxy: {
    //   '/api': {
    //     target: `https://${proxyHost}/`,
    //     pathRewrite: { '^/api': '' },
    //     secure: false,
    //     headers: {
    //       Host: proxyHost,
    //     },
    //   },
    // },
  },
});

module.exports = config;
