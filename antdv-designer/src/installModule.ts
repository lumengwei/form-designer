import {FormHelper} from '@/helper';
import FormStudio from "../../src/FormStudio";

function installFactory(modules: __WebpackModuleApi.RequireContext) {
    modules.keys().forEach((key) => {
        const mod = modules(key);
        FormStudio.registerFactory(mod.default);
    });
}

function installDef(modules: __WebpackModuleApi.RequireContext) {
    modules.keys().forEach((key) => {
        const mod = modules(key);
        FormHelper.registerComponent(mod.default);
    });
}

installFactory(require.context('./components', true, /Factory.ts/))
installFactory(require.context('./layout', true, /Factory.ts/))
installDef(require.context('./components', true, /index.vue/))
installDef(require.context('./layout', true, /index.vue/))

export default function install(modules: string[]) {
    console.log(modules);
}
