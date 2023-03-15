import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import type {Configuration} from "webpack";
import * as webpack from "webpack";
import type {LoaderContext} from "mini-css-extract-plugin/types/utils";

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');

function getLocalIdent(context: LoaderContext,
                       localIdentName: string,
                       localName: string) {
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
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
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
        extensions: ['.tsx', '.ts', '.js']
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
