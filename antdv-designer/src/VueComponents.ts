import type {ComponentDefinition} from "@@/types";
import {ComponentInternalInstance} from "@vue/runtime-core";

export interface VueComponents extends ComponentInternalInstance {

    /**
     * shouldComponentUpdate 默认不是对象的深层比较，采用标志位的方式
     * 此方法代替foreUpdate
     */
    forceRender(): void;
}

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

}

export interface ComponentGroup extends VueComponents, ComponentGroupMethods {

}

export interface Layout extends ComponentGroup {

}
