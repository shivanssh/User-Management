const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'); // generates html(index.html) from template
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extract css from index.html

const prod = process.env.NODE_ENV === 'production';
module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // [contenthash] for having unquie naming convention for caching -- "clean"
    publicPath: '/', // redirect to relative path instead of [name]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    hot: true, // hot reload
    open: true, //open browser
    compress: true, //zgip
    historyApiFallback: true, // make refersh work
  },
  devtool: prod ? undefined : 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.json', '.js'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {},
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CRUD Application',
      filename: 'index.html',
      template: 'public/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
