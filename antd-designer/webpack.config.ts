import type {Configuration} from "webpack";
import defaultConfig from '../build/config'

const path = require('path')
const config: Configuration = {
    ...defaultConfig,
    mode: "development",
    entry: path.resolve(__dirname, 'src/index.tsx'),
};


export default config;
