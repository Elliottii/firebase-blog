const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'assets/',
          to: 'assets/',
          context: 'src/',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Firebase blog',
      meta: {
        viewport:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new ESLintPlugin({}),
    new Dotenv(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // inject CSS to page
            loader: 'style-loader',
          },
          {
            // translates CSS into CommonJS modules
            loader: 'css-loader',
          },
          {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [require('autoprefixer')];
                },
              },
            },
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
