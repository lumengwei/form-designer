import type {Configuration} from "webpack";
import * as path from 'path';
import * as defaultConfig from '../build/config'

const config: Configuration = {
    ...defaultConfig,
    mode: "development",
    entry: path.resolve(__dirname, 'src/index.vue'),
};


export default config;
