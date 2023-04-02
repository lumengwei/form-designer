import type {Configuration} from "webpack";
import defaultConfig from '../config/webpack.base.config'

const {merge} = require('webpack-merge');
const path = require('path')
const config: Configuration = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        hot: true,
        port: 9002
    }
};

const finalConfig = merge(defaultConfig, config);

console.log(finalConfig)

export default finalConfig;
