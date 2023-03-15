import {registerComponent} from './ComponentDef';
import FormStudio from "../../src/FormStudio";
import RequireContext = __WebpackModuleApi.RequireContext;

function installFactory(modules: RequireContext) {
    Object.keys(modules).forEach((key) => {
        const mod = modules(key);
        FormStudio.registerFactory(mod.default);
    });
}

function installDef(modules: RequireContext) {
    Object.keys(modules).forEach((key) => {
        const mod = modules(key);
        registerComponent(mod.default);
    });
}

installFactory(require.context('./components/*', false, /Factory.ts/, 'eager'))
installFactory(require.context('./layout/*', false, /Factory.ts/, 'eager'))
installDef(require.context('./components/*', false, /index.vue/, 'eager'))
installDef(require.context('./layout/*', false, /index.vue/, 'eager'))

export default function install(modules: string[]) {
    console.log(modules);
}