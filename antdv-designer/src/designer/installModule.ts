import {FormHelper} from '@/designer/helper';
import FormStudio from "@@/FormStudio";

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

function installEditor(modules: __WebpackModuleApi.RequireContext) {
    modules.keys().forEach((key) => {
        const mod = modules(key);
        FormHelper.registerEditor(mod.default);
    });
}


installFactory(require.context('@@/factory', true, /Factory.ts/))
installDef(require.context('./components', true, /index.vue/))
installDef(require.context('./layout', true, /index.vue/))
installEditor(require.context('./components', true, /PropEditor.vue/))
installEditor(require.context('./layout', true, /PropEditor.vue/))

export default function install(modules: string[]) {
    console.log(modules);
}
