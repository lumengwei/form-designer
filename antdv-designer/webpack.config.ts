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
    plugins: [
        new VueLoaderPlugin(),
        ...defaultConfig.plugins!,
    ]
};

export default config;
