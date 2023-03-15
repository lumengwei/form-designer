import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import type {Configuration} from "webpack";
import * as webpack from "webpack";
import * as path from 'path';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');

function getLocalIdent(context, localIdentName, localName) {
    return localName;
}


const devServer: DevServerConfiguration = {
    static: {
        directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000

};

const config: Configuration = {
    mode: "development",
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
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
                            camelCase: true,
                            modules: true,
                            getLocalIdent: getLocalIdent
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
                            camelCase: true,
                            modules: true,
                            getLocalIdent: getLocalIdent
                        }
                    }
                    , {loader: 'less-loader', options: {javascriptEnabled: true}}]
            },
        ]
    },
    resolve: {
        extensions: [".js"]
    },
    devServer,
    plugins: [
        new ExtractTextPlugin({filename: "[name].css",}),
        new HtmlWebpackPlugin({
            title: 'Form Designer'
        }),
        new webpack.HotModuleReplacementPlugin({
            // Options...
        })
    ]
};


export default config;
