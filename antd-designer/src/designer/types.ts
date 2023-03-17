import {ComponentDefinition} from "../../../src/types";
import {Component, ReactElement} from "react";
import {InputProps} from "../../../src/props";

export interface ComponentFactoryRender<T, P> {
    renderComponent(definition: ComponentDefinition<T>): (props: P) => ReactElement;

    renderEditor(definition: ComponentDefinition<T>): (props: P) => ReactElement;
}

export interface ComponentEditor<T> extends Component<ReactComponentProps<T>> {
    onChange(props: ComponentDefinition<T>): void;
}

export interface ReactComponentProps<T> {
    definition: ComponentDefinition<InputProps>
}
