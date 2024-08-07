/* eslint-disable no-undef */
/* eslint-disable perfectionist/sort-objects */
/* eslint-disable @typescript-eslint/no-var-requires */
// const deps = require('./package.json').dependencies;
// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function production(envVars) {
  const { env } = envVars;
  return {
    output: {
      filename: '[name].[contenthash].js',
      publicPath: env == 'production' ? '/' : 'http://localhost:3000/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    devServer: {
      client: {
        overlay: {
          runtimeErrors: (error) => {
            const ignoreErrors = [
              'ResizeObserver loop limit exceeded',
              'ResizeObserver loop completed with undelivered notifications.',
            ];
            if (ignoreErrors.includes(error.message)) {
              return false;
            }
            return true;
          },
        },
      },

      historyApiFallback: {
        index: '/',
        disableDotRule: true,
      },
      port: 3000,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          type: 'asset',
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].css',
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        favicon: 'src/favicon.svg',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
      new Dotenv(envVars),
    ],
  };
};
