import {FormHelper} from '@/helper';
import FormStudio from "../../src/FormStudio";

function installFactory(modules: __WebpackModuleApi.RequireContext) {
    Object.keys(modules).forEach((key) => {
        const mod = modules(key);
        console.log(mod)
        FormStudio.registerFactory(mod.default);
    });
}

function installDef(modules: __WebpackModuleApi.RequireContext) {
    Object.keys(modules).forEach((key) => {
        const mod = modules(key);
        console.log(mod)
        FormHelper.registerComponent(mod.default);
    });
}

installFactory(require.context('./components', false, /Factory.ts/, 'eager'))
installFactory(require.context('./layout', false, /Factory.ts/, 'eager'))
installDef(require.context('./components', false, /index.vue/, 'eager'))
installDef(require.context('./layout', false, /index.vue/, 'eager'))

export default function install(modules: string[]) {
    console.log(modules);
}
