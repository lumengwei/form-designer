import type {Configuration} from "webpack";
import defaultConfig from '../build/config'

const {VueLoaderPlugin} = require('vue-loader');

const path = require('path')
const config: Configuration = {
    ...defaultConfig,
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module!.rules!,
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {}
                }],

            }
        ]
    },
    devtool: 'source-map',
    mode: "development",
    entry: path.resolve(__dirname, 'src/main.ts'),
    resolve: {
        extensions: [".js", ".vue", ".json", ".ts", ".tsx", ".mjs"],
        alias: {
            "@": path.join(__dirname, 'src'),
        },
    },
    plugins: [
        ...defaultConfig.plugins!,
        new VueLoaderPlugin(),
    ]
};

export default config;
