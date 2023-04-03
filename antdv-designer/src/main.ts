import App from './App.vue'
import {createApp} from 'vue'
import envs from "../../config/envs";

require('./style.less')
const app = createApp(App)

const win: any = window;

if (process.env.ENV_MODE == envs.DEV) {
    if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {
        // @ts-ignore
        win['__VUE_DEVTOOLS_GLOBAL_HOOK__'].Vue = app;
    }
}


app.mount('body')
