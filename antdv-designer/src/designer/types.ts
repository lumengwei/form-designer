import {ComponentDefinition} from "@@/types";
import {ComponentInternalInstance} from "@vue/runtime-core";

export interface ComponentFactoryRender<T, P> {
    renderComponent(definition: ComponentDefinition<T>): (props: P) => ComponentInternalInstance;

    renderEditor(definition: ComponentDefinition<T>): (props: P) => ComponentInternalInstance;
}

export interface ComponentEditor<P extends VueComponentProps<T>, T> extends ComponentInternalInstance {
}

export interface VueComponentProps<T> {
    definition: ComponentDefinition<T>;

    onRemove(): void;
}


export interface ReactComponentState {
    renderCounter: number;
}

export interface ReactComponentGroupState<T> extends ComponentInternalInstance {
    definition: ComponentDefinition<T> | null;
}


export interface Activatable {
    onActive(): void;

    unActive(): void;
}
