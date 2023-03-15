const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const path = require("path");
const webpack = require("webpack");

function getLocalIdent(context, localIdentName, localName) {
  return localName;
}

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, "dist"),
        // filename: "form.js"
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins:[
                            "@babel/plugin-transform-react-jsx",
                            require("@babel/plugin-syntax-dynamic-import"),
                            [require("@babel/plugin-proposal-decorators"), { "legacy": true }],
                            [require("@babel/plugin-proposal-class-properties"), { "loose": false }]]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    ExtractTextPlugin.loader,
                    {
                        loader:'css-loader',
                        options: {
                            importLoaders:1,
                            camelCase: true,
                            modules:true,
                            getLocalIdent:getLocalIdent
                        }
                    },
                    ]
            },
            {
                test:/\.less$/,
                use: [
                    ExtractTextPlugin.loader,
                    {
                        loader:'css-loader',
                        options: {
                            importLoaders:1,
                            camelCase: true,
                            modules:true,
                            getLocalIdent:getLocalIdent
                        }
                    }
                    ,{loader: 'less-loader', options:{ javascriptEnabled: true }}]
            },
        ]
    },
    resolve: {
        extensions: [".js"]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [
        new ExtractTextPlugin({ filename: "[name].css",}),
        new HtmlWebpackPlugin({
            title:'Form Designer'
        }),
        new webpack.HotModuleReplacementPlugin({
            // Options...
        })
    ]
};
