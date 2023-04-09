const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PugPlugin = require("pug-plugin");

const { NODE_ENV } = process.env;
const path = require("path");

module.exports = {
    mode: NODE_ENV,
    entry: {
        main: path.join(__dirname, "src", "app.js"),
        index: path.join(__dirname, "src", "pages", "index.pug"),
    },
    output: {
        path: path.join(__dirname, "build"),

        publicPath: NODE_ENV === "development" ? "/" : "./",
        //filename: "index.js",
        assetModuleFilename: path.join(
            "src",
            "images",
            "[name].[contenthash][ext]"
        ),
        filename: "[name].js",
        chunkFilename: "static/js/[name].chunk.js",
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    module: {
        rules: [
            {
                // обработка JS
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                // pug
                test: /\.pug$/,
                //include: path.join(__dirname, "src", "page"),
                loader: PugPlugin.loader,
                // loader: "pug-loader",
            },
            {
                // обработка CSS
                test: /\.(pcss|css)$/i,
                use: [
                    NODE_ENV === "development"
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                config: path.resolve(
                                    __dirname,
                                    "postcss.config.js"
                                ),
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
                type: "asset/resource",
            },
            {
                //fonts
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: "javascript/auto",
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            //css
            filename: "styles/[name].css",
        }),
        new StyleLintPlugin({
            configFile: path.join(__dirname, "stylelint.config.js"),
            context: path.join(__dirname, "src", "styles"),
            files: "**/*.*css",
        }),
        new PugPlugin({
            js: {
                filename: "js/[name].[contenthash:8].js", // output filename of JS
            },
            css: {
                filename: "css/[name].[contenthash:8].css", // output filename of CSS
            },
        }),
        new ESLintPlugin(), //js
    ],
    devServer: {
        watchFiles: path.join(__dirname, "src"),
        open: true,
        hot: false,
        liveReload: true,
    },
};
