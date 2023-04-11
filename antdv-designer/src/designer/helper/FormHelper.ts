import {ComponentFactory} from "@@/types";
import {DefineComponent} from "@vue/runtime-core";

class FormHelper {
    private _activeComponentIns: any | null = null;
    private _formEditorIns: any | null = null;
    private _formView: any | null = null;
    private _componentFactory: ComponentFactory<any> | null = null;
    private _componentDefine: Map<String, DefineComponent> = new Map<String, DefineComponent>();
    private _editorDefine: Map<String, DefineComponent> = new Map<String, DefineComponent>();
    private _activeComponentId: string | null = null;


    get activeComponentIns() {
        return this._activeComponentIns;
    }

    set activeComponentIns(inst) {
        // 取消原有选中状态
        this._activeComponentId = null;
        if (this._activeComponentIns) {
            this._activeComponentIns.$forceUpdate();
        }
        this._activeComponentIns = inst;
        if (inst?.$props) {
            this._activeComponentId = inst?.$props.definition.id;
            this._formEditorIns?.setDefinition(inst?.$props.definition)
        } else {
            this._formEditorIns?.setDefinition(null)
        }

        // 刷新现有的选中状态
        if (this._activeComponentIns) {
            this._activeComponentIns.$forceUpdate();
        }
    }

    get activeComponentId() {
        return this._activeComponentId;
    }

    set activeComponentId(id) {
        this._activeComponentId = id;
    }

    get formEditorIns() {
        return this._formEditorIns;
    }

    set formEditorIns(inst) {
        this._formEditorIns = inst;
    }

    get formView() {
        return this._formView;
    }

    set formView(inst) {
        this._formView = inst;
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
