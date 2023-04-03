import {ComponentFactory} from "@@/types";
import {DefineComponent} from "@vue/runtime-core";

class FormHelper {
    private _activeComponentIns: any | null = null;
    private _componentFactory: ComponentFactory<any> | null = null;
    private _componentDefine: Map<String, DefineComponent> = new Map<String, DefineComponent>();

    get activeComponentIns() {
        return this._activeComponentIns;
    }

    set activeComponentIns(inst) {
        this._activeComponentIns?.unActive();
        this._activeComponentIns = inst;
        this._activeComponentIns?.onActive();
    }

    get componentFactory() {
        return this._componentFactory;
    }

    set componentFactory(inst) {
        this._componentFactory = inst;
    }

    registerComponent(defineComponent: DefineComponent) {
        this._componentDefine.set(defineComponent.name, defineComponent);
    }

    getComponent(type: string) {
        return this._componentDefine.get(type);
    }


}

export default new FormHelper();
