const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
console.info(`MODE IS: ${isDev ? 'Development' : 'Production'}`);

const optimization = () => {
  const conf = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (!isDev) {
    conf.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return conf;
}

const babelOptions = (preset) => {
  const options = {
    presets: ['@babel/preset-env'],
  };

  if (preset) {
    options.presets.push(preset);
  }

  return options;
};

const cssLoaders = (extraLoader) => {
  const loaders = [
    !isDev ? 
    {
      loader: MiniCssExtractPlugin.loader,
    }
    : 'style-loader',
    'css-loader'
  ];

  if (extraLoader) {
    loaders.push(extraLoader);
  }

  return loaders;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.jsx'],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:4001'
    },
    port: 3000,
    hot: isDev,
    inline: true,
    open: 'Chrome'
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Task',
      template: './index.html',
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions(),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        },
      },
      {
        test: /\.css$/,
        use : cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use : cssLoaders('sass-loader')
      }
    ],
  },
};
