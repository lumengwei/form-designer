import type {ComponentDefinition} from "@@/types";
import {Component, ReactElement} from "react";

export interface ComponentFactoryRender<T, P> {
    renderComponent(definition: ComponentDefinition<T>): (props: P) => ReactElement;

    renderEditor(definition: ComponentDefinition<T>): (props: P) => ReactElement;
}

export interface ComponentEditor<P extends ReactComponentProps<T>, T> extends Component<P> {
}

export interface ReactComponentProps<T> {
    definition: ComponentDefinition<T>;

    onRemove(): void;
}


export interface ReactComponentState {
    renderCounter: number;
}

export interface ReactComponentGroupState<T> extends ReactComponentState {
    definition: ComponentDefinition<T> | null;
}


export interface Activatable {
    onActive(): void;

    unActive(): void;
}
