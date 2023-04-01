import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import type {Configuration} from "webpack";

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');


const devServer: DevServerConfiguration = {
    static: {
        directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true,
    port: 9001
};

const config: Configuration = {
    infrastructureLogging: {
        appendOnly: true,
        level: 'verbose',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    stats: {
        errorDetails: true
    },
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        logLevel: 'info',
                        logInfoToStdOut: true,
                        appendTsSuffixTo: [/\.vue$/]
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-transform-react-jsx",
                            require("@babel/plugin-syntax-dynamic-import"),
                            [require("@babel/plugin-proposal-decorators"), {"legacy": true}],
                            [require("@babel/plugin-proposal-class-properties"), {"loose": false}]]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    ExtractTextPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: 'local'
                            },
                        }
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    ExtractTextPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: 'local'
                            },
                        }
                    }
                    , {loader: 'less-loader', options: {}}]
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    devServer,
    plugins: [
        new ExtractTextPlugin({filename: "[name].css",}),
        new HtmlWebpackPlugin({
            title: 'Form Designer'
        })
    ]
};


export default config;
