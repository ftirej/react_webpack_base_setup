const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[name]_[local]_[hash:base64:5].css',
  },
};

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false,
  },
};

const PostCSSLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: false, // turned off as causes delay
    plugins: () => [require('autoprefixer')],
  },
};

const config = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React App',
      template: path.join(__dirname, 'public/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          CSSLoader,
          PostCSSLoader,
          'sass-loader',
        ],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          CSSModuleLoader,
          PostCSSLoader,
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,

        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              name: '[name][md5:hash].[ext]',
              outputPath: 'assets/',
              //publicPath: "/assets/"
            },
          },
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              //publicPath: "/public/assets/",
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

module.exports = { config, CSSModuleLoader, CSSLoader, PostCSSLoader };
