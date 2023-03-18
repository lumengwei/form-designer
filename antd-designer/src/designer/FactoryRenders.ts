import {ComponentFactoryRender} from "./types";

class FactoryRenders {
    private _renders: Map<string, ComponentFactoryRender<any, any>>;

    constructor() {
        this._renders = new Map<string, ComponentFactoryRender<any, any>>();
    }

    register<T>(factory: ComponentFactoryRender<T, any>, factoryType: string) {
        if (this._renders.has(factoryType)) {
            console.log(`[warn] factory ${factoryType} is exist, ignore`);
            return;
        }

        this._renders.set(factoryType, factory);
    }

    getRender<T>(factoryType: string): ComponentFactoryRender<T, any> {
        return this._renders.get(factoryType) as ComponentFactoryRender<T, any>;
    }
}

export default new FactoryRenders();
