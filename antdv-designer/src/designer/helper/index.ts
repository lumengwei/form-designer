import FormHelper from './FormHelper';
import { ComponentPublicInstance, getCurrentInstance } from 'vue';
import { ComponentGroup, ComponentGroupMethods } from '../VueComponents';
import { ComponentDefinition } from '@@/types';
import { DefineComponent } from '@vue/runtime-core';
import { VueComponentProps } from '../types';

export { FormHelper };

export function useVueComponent() {
    const inst: ComponentPublicInstance | null = getCurrentInstance() as ComponentPublicInstance | null;
    return () => {
        if (inst) {
            inst.$forceUpdate();
        }
    };
}

export function useVueComponentGroup(): ComponentGroupMethods {
    const inst: ComponentGroup<VueComponentProps<any>> | null = getCurrentInstance()
        ?.proxy as ComponentGroup<VueComponentProps<any>> | null;

    function sortBySlot(a: ComponentDefinition<any>, b: ComponentDefinition<any>) {
        return (a.slot ?? 0) - (b.slot ?? 0);
    }
    function addChildBySlot(slot: number, componentDefinition: ComponentDefinition<any>) {
        if (!componentDefinition) {
            return;
        }
        const definition = inst?.$props.definition;
        if (definition) {
            if (!definition.children) {
                definition.children = [];
            }
            componentDefinition.slot = slot;
            definition.children!.push(componentDefinition);
            definition.children = definition.children!.filter(Boolean);
            definition.children!.sort(sortBySlot);
            inst!.forceRender();
        } else {
            // TODO
        }
    }

    function removeChildBySlot(slot: number) {
        const definition = inst?.$props.definition;
        if (definition && definition.children) {
            const child = definition.children?.filter((it) => it.slot == slot)[0];
            if (child) {
                definition.children!.splice(definition.children?.indexOf(child), 1);
                inst!.forceRender();
            }
        } else {
            // TODO
        }
    }

    /**
     *
     * @param index
     * @deprecated
     */
    function removeChild(index: number) {
        const definition = inst?.$props.definition;
        if (definition && definition.children) {
            definition.children!.splice(index, 1);
            inst!.forceRender();
        }
    }

    function addChild(index: number, componentDefinition: ComponentDefinition<any>) {
        if (!componentDefinition) {
            return;
        }
        const definition = inst?.$props.definition;
        if (definition) {
            if (!definition.children) {
                definition.children = [];
            }
            definition.children!.splice(index, 0, componentDefinition);
            inst!.forceRender();
        }
    }

    /**
     * @param source
     * @param target
     * @deprecated
     */
    function changeIndex(source: number, target: number) {
        const definition = inst?.$props.definition;
        if (definition && definition.children) {
            const s = definition.children![source];
            definition.children![source] = definition.children![target];
            definition.children![target] = s;
            inst!.forceRender();
        }
    }

    /**
     * 交换slot
     * @param source
     * @param target
     */
    function changeSlot(source: number, target: number) {
        const definition = inst?.$props.definition;
        if (definition && definition.children) {
            let s, t;
            for (const cmp of definition.children) {
                if (cmp.slot == source) {
                    s = cmp;
                } else if (cmp.slot == target) {
                    t = cmp;
                }
            }
            if (s && t) {
                // 交换slot
                s.slot = target;
                t.slot = source;

                // 重新排序
                definition.children!.sort(sortBySlot);
                inst!.forceRender();
            }
        }
    }

    function getChildBySlot(slot: number): ComponentDefinition<any> | undefined {
        const definition = inst?.$props.definition;
        console.log('getChildBySlot', slot, definition);
        if (definition && definition.children) {
            return definition.children?.filter((it) => it.slot == slot)[0] || undefined;
        }

        return undefined;
    }

    function forceRender() {
        if (inst) {
            inst.$forceUpdate();
        }
    }

    function getComponent(type: string): DefineComponent {
        return FormHelper.getComponent(type);
    }

    /**
     * 根据index 重置slot
     */
    function resetSlot() {
        const definition = inst?.$props.definition;
        if (definition && definition.children) {
            definition.children.forEach((item, index) => {
                item.slot = index;
            });
            inst!.forceRender();
        }
    }
    return {
        addChildBySlot,
        removeChildBySlot,
        removeChild,
        addChild,
        changeIndex,
        resetSlot,
        getChildBySlot,
        changeSlot,
        forceRender,
        getComponent,
    };
}
