import type {ComponentDefinition} from "@@/types";
import {ComponentInternalInstance, DefineComponent} from "@vue/runtime-core";
import {ComponentPublicInstance} from "vue";


export type VueComponents<T = {}> = {

    /**
     * shouldComponentUpdate 默认不是对象的深层比较，采用标志位的方式
     * 此方法代替foreUpdate
     */
    forceRender(): void;
} & ComponentPublicInstance<T>;


export interface ComponentGroupMethods {

    /**
     * 添加子组件
     * @param index
     * @param componentDefinition
     */
    addChildBySlot(slot: number, componentDefinition: ComponentDefinition<any>): void;

    /**
     * 移除子组件
     * @param index
     */
    removeChildBySlot(slot: number): void;

    /**
     * 移除子组件
     * @param index
     */
    removeChild(index: number): void;

    addChild(index: number, componentDefinition: ComponentDefinition<any>): void;

    changeIndex(source: number, target: number): void;

    /**
     * 获取插槽上的组件
     * @param index
     * @param componentDefinition
     */
    getChildBySlot(slot: number): ComponentDefinition<any> | null;

    forceRender(): void;

    getComponent(type: string): DefineComponent;

}

export type ComponentGroup<T = {}> = {} & VueComponents<T> & ComponentGroupMethods;

export type Layout<T> = ComponentGroup<T>;
