import {Activatable, ReactComponentProps} from "../types";
import FormEditor from "../FormEditor";
import {ComponentFactory} from "../../../../src/types";
import {ComponentSpec} from "react";

class FormHelper {
    private _activeComponentIns: Activatable & ComponentSpec<ReactComponentProps<any>, any> | null = null;
    private _formEditorIns: FormEditor | null = null;
    private _componentFactory: ComponentFactory<any> | null = null;

    get activeComponentIns() {
        return this._activeComponentIns;
    }

    set activeComponentIns(inst) {
        this._activeComponentIns?.unActive();
        this._activeComponentIns = inst;
        this._activeComponentIns?.onActive();
        if (inst?.props) {
            this._formEditorIns?.setDefinition(inst?.props.definition)
        } else {
            this._formEditorIns?.setDefinition(null)
        }
    }

    get formEditorIns() {
        return this._formEditorIns;
    }

    set formEditorIns(inst) {
        this._formEditorIns = inst;
    }


    get componentFactory() {
        return this._componentFactory;
    }

    set componentFactory(inst) {
        this._componentFactory = inst;
    }


}

export default new FormHelper();
