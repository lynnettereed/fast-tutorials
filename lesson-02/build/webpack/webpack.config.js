const webpack = require("webpack");
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ConfigPluginsDev = require(path.resolve('build/webpack/webpack.dev.config'));
const ConfigPluginsPro = require(path.resolve('build/webpack/webpack.pro.config'));

/**
 * Create configuration object
 */
const config = {
    devServer: {
        contentBase: './public',
        port: 1500
    },
    devtool: 'source-map',
    entry: "./app/index.jsx",
    output: {
        path: path.resolve("build/public"),
        publicPath: "/"
    },
    mode: process.env.NODE_ENV || "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }]
            },
            {
                test: /.jsx?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react'],
                        plugins: [
                            "transform-runtime",
                            "transform-react-jsx"
                        ]
                    }
                    },
                    {
                        loader: 'eslint-loader',
                    }],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader?name=assets/images/logos/[name].[ext]'
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/i,
                loader: 'file-loader?name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.(mp4|webm|ogg)$/i,
                loader: 'file-loader?name=assets/videos/[name].[ext]'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: "css-loader" },
                        { loader: "postcss-loader" },
                        { loader: "sass-loader" }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: "css-loader" },
                        { loader: "postcss-loader" }
                    ]
                })
            }
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new CleanWebpackPlugin(
            [
                './build/public'
            ],
            {
                verbose:true
            }
        ),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
}

/**
 * Run correct environment
 */
switch (process.env.NODE_ENV) {
    case 'development':
        config.plugins = config.plugins.concat(ConfigPluginsDev);
        config.output.pathinfo = true;
        config.output.filename = "assets/scripts/m-[name]-bundle.js";
    
        break;
        
    case 'production':
        config.plugins = config.plugins.concat(ConfigPluginsPro);
        config.output.filename = "assets/scripts/m-[hash]-bundle.min.js";
        
        break;
}

module.exports = config;