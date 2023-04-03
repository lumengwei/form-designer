import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import type {Configuration} from "webpack";
import envs from "./envs";

const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')

const env = dotenv.config({path: path.resolve(__dirname, '../.env.' + process.env.ENV_MODE)}).parsed
const envKeys = Object.keys(env).reduce((prev: any, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
}, {
    'process.env.ENV_MODE': `'${process.env.ENV_MODE}'`
})


console.log(envKeys)

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

export const isEnvDevelopment = process.env.ENV_MODE === envs.DEV;
export const isEnvProduction = process.env.ENV_MODE === envs.PROD;

const devServer: DevServerConfiguration = {
    static: {
        directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true,
    port: 9001
};

function getWebpackMode() {
    switch (process.env.ENV_MODE) {
        case envs.PROD:
            return 'production';
        case envs.DEV:
        default:
            return 'development';
    }
}

function getStyleLoaders(cssOptions: any, preProcessor?: any): any[] {
    console.log(isEnvDevelopment)
    const loaders = [
        isEnvDevelopment && {
            loader: require.resolve('style-loader')
        },
        isEnvProduction && {
            loader: ExtractTextPlugin.loader,
        },
        {
            loader: 'css-loader',
            options: Object.assign({}, cssOptions, {
                importLoaders: 1 + preProcessor ? 1 : 0,
                esModule: false,
            }),
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: isEnvDevelopment,
            },
        },
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push(preProcessor);
    }

    console.log('getStyleLoaders', loaders)
    return loaders;
};

const config: Configuration = {
    mode: getWebpackMode(),
    devtool: isEnvDevelopment ? 'source-map' : false,
    infrastructureLogging: {
        appendOnly: true,
        level: 'verbose',
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
                },
                exclude: /node_modules/
            },
            {
                test: cssRegex,
                exclude: cssModuleRegex,
                use: getStyleLoaders({
                    modules: false,
                    sourceMap: isEnvDevelopment
                })
            },
            {
                test: cssModuleRegex,
                use: getStyleLoaders({
                    modules: true,
                    sourceMap: isEnvDevelopment
                })
            },
            {
                test: lessRegex,
                exclude: lessModuleRegex,
                use: getStyleLoaders({
                    modules: false,
                    sourceMap: isEnvDevelopment
                }, {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            javascriptEnabled: true
                        }
                    }
                })
            },
            {
                test: lessModuleRegex,
                use: getStyleLoaders({
                    modules: true,
                    sourceMap: isEnvDevelopment
                }, {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            javascriptEnabled: true
                        }
                    }
                })
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@@': path.resolve(__dirname, '../src')
        }
    },
    devServer,
    plugins: [
        new webpack.DefinePlugin(envKeys),
        new ExtractTextPlugin({filename: "[name].css",}),
        new HtmlWebpackPlugin({
            title: 'Form Designer',
            template: path.resolve(__dirname, 'index.ejs')
        })
    ]
};


export default config;
