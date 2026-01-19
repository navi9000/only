const path = require("path")
const { ProvidePlugin } = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {
    home: "./src/main.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/index.js",
    cssFilename: "css/index.css",
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new ProvidePlugin({
      React: "react",
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        exclude: /node_modules/,
        // generator: {
        //   outputPath: "assets/img/",
        //   filename: "[name][ext]",
        // },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        exclude: /node_modules/,
        // generator: {
        //   outputPath: "assets/fonts/",
        //   filename: "[name][ext]",
        // },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.module\.scss$/i,
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: [
          MiniCssExtractPlugin.loader,
          ,
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: false,
                exportLocalsConvention: "asIs",
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: `@use "scssVariables" as *;`,
              sassOptions: {
                loadPaths: ["src"],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: [/node_modules/, /\.module\.scss$/i],
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: false,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@/*": path.resolve(process.cwd(), "./src/*"),
    },
  },
}
