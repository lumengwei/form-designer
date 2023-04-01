import type {Configuration} from "webpack";
import defaultConfig from '../build/webpack.base.config'

const {merge} = require('webpack-merge');
const path = require('path')
const config: Configuration = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, './src/index.tsx'),
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
};

const finalConfig = merge(defaultConfig, config);

console.log(finalConfig)

export default finalConfig;
