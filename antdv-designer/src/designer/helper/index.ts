import formHelper from "./FormHelper";
import {ComponentPublicInstance, getCurrentInstance} from "vue";
import {ComponentGroup, ComponentGroupMethods} from "../../VueComponents";
import {ComponentDefinition} from "@@/types";
import {DefineComponent} from "@vue/runtime-core";
import {VueComponentProps} from "@/designer/types";

export const FormHelper = formHelper;

export function useVueComponent() {
    const inst: ComponentPublicInstance | null = getCurrentInstance() as ComponentPublicInstance | null;
    return () => {
        if (inst) {
            inst.$forceUpdate();
        }
    }
}


export function useVueComponentGroup(): ComponentGroupMethods {
    const inst: ComponentGroup<VueComponentProps<any>> | null = getCurrentInstance()?.proxy as ComponentGroup<VueComponentProps<any>> | null;

    function addChildBySlot(slot: number, componentDefinition: ComponentDefinition<any>) {
        const definition = inst?.$props.definition
        if (definition && definition.children) {
            componentDefinition.slot = slot;
            definition.children?.push(componentDefinition);
            inst.forceRender();
        } else {
            // TODO
        }
    }

    function removeChildBySlot(slot: number) {
        const definition = inst?.$props.definition;
        if (definition && definition.children) {
            const child = definition.children?.filter(it => it.slot == slot)[0]
            if (child) {
                definition.children!.splice(definition.children?.indexOf(child), 1)
                inst.forceRender();
            }
        } else {
            // TODO
        }
    }

    function removeChild(index: number) {
        const definition = inst?.$props.definition;
        if (definition && definition.children) {
            definition.children!.splice(index, 1);
            inst.forceRender();
        }
    }

    function addChild(index: number, componentDefinition: ComponentDefinition<any>) {
        const definition = inst?.$props.definition;
        if (definition && definition.children) {
            definition.children!.splice(index, 0, componentDefinition)
            inst.forceRender();
        }
    }

    function changeIndex(source: number, target: number) {
        const definition = inst?.$props.definition;
        if (definition && definition.children) {
            const s = definition.children![source];
            definition.children![source] = definition.children![target];
            definition.children![target] = s;
            inst.forceRender();
        }
    }

    function getChildBySlot(slot: number): ComponentDefinition<any> | null {
        const definition = inst?.$props.definition;
        if (definition && definition.children) {
            return definition.children?.filter(it => it.slot == slot)[0] || null
        }

        return null;
    }

    function forceRender() {
        if (inst) {
            inst.$forceUpdate();
        }
    }

    function getComponent(type: string): DefineComponent {
        return FormHelper.getComponent(type)
    }

    return {
        addChildBySlot,
        removeChildBySlot,
        removeChild,
        addChild,
        changeIndex,
        getChildBySlot,
        forceRender,
        getComponent
    }
}
