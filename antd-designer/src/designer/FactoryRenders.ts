import {ComponentFactoryRender} from "./types";
import {ComponentFactory} from "../../../src/types";

class FactoryRenders {
    private _renders = new Map<string, ComponentFactoryRender<any, any>>();

    register<T extends ComponentFactory<T>>(factory: ComponentFactoryRender<T, any>, factoryType: string) {
        if (this._renders.has(factoryType)) {
            console.log(`[warn] factory ${factoryType} is exist, ignore`);
            return;
        }

        this._renders.set(factoryType, factory);
    }

    getRender<T extends ComponentFactory<T>>(factoryType: string): ComponentFactoryRender<T, any> {
        return this._renders.get(factoryType) as ComponentFactoryRender<T, any>;
    }
}

export default new FactoryRenders();
