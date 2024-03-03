import {ComponentFactoryRender} from "../types";
import {ComponentType} from "@@/types";

class FactoryRenders {
    private _renders: Map<string, ComponentFactoryRender<any, any>>;

    constructor() {
        this._renders = new Map<string, ComponentFactoryRender<any, any>>();
    }

    register<T extends ComponentType>(factory: ComponentFactoryRender<T, any>, factoryType: string) {
        if (this._renders.has(factoryType)) {
            console.log(`[warn] factory ${factoryType} is exist, ignore`);
            return;
        }

        this._renders.set(factoryType, factory);
    }

    getRender<T extends ComponentType>(factoryType: T): ComponentFactoryRender<T, any> {
        return this._renders.get(factoryType) as ComponentFactoryRender<T, any>;
    }
}

export default new FactoryRenders();
