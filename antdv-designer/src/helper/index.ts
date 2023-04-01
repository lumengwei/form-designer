import formHelper from "./FormHelper";
import {ComponentPublicInstance, getCurrentInstance} from "vue";
import {ComponentGroupMethods} from "../VueComponents";
import {ComponentDefinition} from "@@/types";

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
    const inst: ComponentPublicInstance | null = getCurrentInstance() as ComponentPublicInstance | null;

    function addChildBySlot(slot: number, componentDefinition: ComponentDefinition<any>) {

    }

    function removeChildBySlot(slot: number) {

    }

    function removeChild(index: number) {

    }

    function addChild(index: number, componentDefinition: ComponentDefinition<any>) {

    }

    function changeIndex(source: number, target: number) {

    }

    function getChildBySlot(slot: number): ComponentDefinition<any> | null {
        return null;
    }

    function forceRender() {
        if (inst) {
            inst.$forceUpdate();
        }
    }

    return {
        addChildBySlot,
        removeChildBySlot,
        removeChild,
        addChild,
        changeIndex,
        getChildBySlot,
        forceRender
    }
}
