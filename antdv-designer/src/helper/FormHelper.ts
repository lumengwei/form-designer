import {ComponentFactory} from "../../../src/types";

class FormHelper {
    private _activeComponentIns: any | null = null;
    private _componentFactory: ComponentFactory<any> | null = null;

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


}

export default new FormHelper();
