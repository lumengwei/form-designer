import {registerComponent} from './ComponentDef';
import FormStudio from "../../src/FormStudio";

function installFactory(modules) {
    Object.keys(modules).forEach((key) => {
        const mod = modules[key];
        FormStudio.registerFactory(mod.default);
    });
}

function installDef(modules) {
    Object.keys(modules).forEach((key) => {
        const mod = modules[key];
        registerComponent(mod.default);
    });
}

installFactory(import.meta.globEager(`./components/*/Factory.ts`));
installFactory(import.meta.globEager(`./layout/*/Factory.ts`));
installDef(import.meta.globEager(`./components/*/index.vue`));
installDef(import.meta.globEager(`./layout/*/index.vue`));

export default function install(modules: string[]) {
    console.log(modules);
}
