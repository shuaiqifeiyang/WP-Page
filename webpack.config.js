const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "build/"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
                // 当前的css所在的文件相对于打包后的根路径dist的相对路径
                publicPath: '../'
            }
        }, "css-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(jpg|png|gif|mp4)$/,
        loader: "url-loader",
        options: {
            limit: 8*1024,
            outputPath: "img"
        }
      },
      {
        exclude: /\.(jpg|png|gif|css|html|js|mp4)$/,
        loader: "file-loader",
        options: {
          outputPath: "css",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/img/word-pyramid-logo.jpg",
      title: "Word Pyramid",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: "production",
  devServer: {
    contentBase: resolve(__dirname, "build"),
  },
};
