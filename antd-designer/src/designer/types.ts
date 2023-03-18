import {ComponentDefinition} from "../../../src/types";
import {Component, ReactElement} from "react";

export interface ComponentFactoryRender<T, P> {
    renderComponent(definition: ComponentDefinition<T>): (props: P) => ReactElement;

    renderEditor(definition: ComponentDefinition<T>): (props: P) => ReactElement;
}

export interface ComponentEditor<P extends ReactComponentProps<T>, T> extends Component<P> {
    onChange(props: any): void;
}

export interface ReactComponentProps<T> {
    definition: ComponentDefinition<T>
}

export interface ReactComponentState {
    renderCounter: number;
}

export interface ReactComponentGroupState<T> extends ReactComponentState {
    definition: ComponentDefinition<T> | null;
}

