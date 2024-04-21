const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './course-server.js',  // Adjusted to your server file, assuming it might serve static assets or handle backend logic
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),  // Output directory for all assets
  },
  target: 'node',  // Since this seems to be a Node.js application
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']  // Ensuring ES6+ is transpiled for compatibility
          }
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']  // Handling SCSS files, extracting CSS to separate files
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']  // Handling plain CSS files similarly
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',  // Handling image assets to be included in the output
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Assuming you have an HTML template in src; adjust as needed
      filename: 'index.html'  // Outputs HTML file to dist folder
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"  // Outputs CSS files with cache-busting hash names
    })
  ]
};
