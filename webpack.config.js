const prod = process.env.NODE_ENV === 'production';

const htmlWebpackPlugin = require('html-webpack-plugin'); // generates html(index.html) from template
const miniCssExtractPlugin = require('mini-css-extract-plugin'); // extract css from index.html

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx', // entry point - file load in client
  output: {
    path: __dirname + '/dist/',
    publicPath: '/',
  },
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
        use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: prod ? undefined : 'source-map',
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: __dirname + '/public/index.html',
    }),
    new miniCssExtractPlugin(),
  ],
};
