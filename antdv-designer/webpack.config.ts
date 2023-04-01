import type {Configuration} from "webpack";
import defaultConfig from '../build/config'

const {VueLoaderPlugin} = require('vue-loader');
const path = require('path');

const config: Configuration = {
    ...defaultConfig,
    module: {
        ...defaultConfig.module,
        parser: {
            javascript: {
                exportsPresence: 'auto',
            },
        },
        rules: [
            ...defaultConfig.module!.rules!,
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        reactivityTransform: true
                    }
                }],

            }
        ]
    },
    devtool: 'source-map',
    mode: "development",
    entry: './src/main.ts',
    // stats: 'verbose',
    stats: {
        // warnings: false,
        logging: 'error',
        errorDetails: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js',
    },
    resolve: {
        ...defaultConfig.resolve,
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        ...defaultConfig.plugins!,
    ]
};

export default config;
