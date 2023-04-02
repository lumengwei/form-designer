import {Configuration, DefinePlugin} from "webpack";
import defaultConfig from '../config/webpack.base.config'

const {merge} = require('webpack-merge');

const {VueLoaderPlugin} = require('vue-loader');
const path = require('path');

const config: Configuration = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js',
    },
    // stats: 'verbose',
    stats: {
        // warnings: false,
        logging: 'error',
        errorDetails: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        parser: {
            javascript: {
                exportsPresence: 'auto',
            },
        },
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        reactivityTransform: false
                    }
                }],

            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_PROD_DEVTOOLS__: process.env.NODE_ENV == 'development',
            __VUE_OPTIONS_API__: process.env.NODE_ENV == 'development',
        }),
    ]
};

const finalConfig = merge(defaultConfig, config);

console.log(finalConfig)
export default finalConfig;
