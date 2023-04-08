import {ComponentFactory} from "@@/types";
import {DefineComponent} from "@vue/runtime-core";

class FormHelper {
    private _activeComponentIns: any | null = null;
    private _formEditorIns: any | null = null;
    private _componentFactory: ComponentFactory<any> | null = null;
    private _componentDefine: Map<String, DefineComponent> = new Map<String, DefineComponent>();
    private _editorDefine: Map<String, DefineComponent> = new Map<String, DefineComponent>();


    get activeComponentIns() {
        return this._activeComponentIns;
    }

    set activeComponentIns(inst) {
        this._activeComponentIns = inst;
        if (inst?.$props) {
            this._formEditorIns?.setDefinition(inst?.$props.definition)
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

    registerComponent(defineComponent: DefineComponent) {
        this._componentDefine.set(defineComponent.name, defineComponent);
    }

    getComponent(type: string): DefineComponent {
        return this._componentDefine.get(type) as DefineComponent;
    }

    registerEditor(defineComponent: DefineComponent) {
        this._editorDefine.set(defineComponent.name, defineComponent);
    }

    getEditor(type: string): DefineComponent {
        return this._editorDefine.get(type) as DefineComponent;
    }
}

export default new FormHelper();
