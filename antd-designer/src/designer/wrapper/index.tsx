import React, {ComponentClass} from 'react';
import {ComponentDefinition, ComponentFactory} from "../../../../src/types";
import FormStudio from "../../../../src/FormStudio";
import FactoryRenders from "../helper/FactoryRenders";
import {ComponentFactoryRender, ReactComponentProps} from "../types";
import {ComponentType} from "@@/types";

/**
 * 注册ComponentFactory
 * @param Factory
 * @constructor
 */
export function FactoryRegister<P extends ReactComponentProps<T>, T extends ComponentType>(Component: ComponentClass<P>
    , ComponentEditor?: ComponentClass<ReactComponentProps<T>>) {

    return function FactoryWrapper<T  extends ComponentType>(factory: ComponentFactory<T>) {
        const render: ComponentFactoryRender<T, any> = {
            renderComponent(componentDefinition: ComponentDefinition<T>) {

                return function (props: any) {
                    return React.createElement(Component, {
                        ...props,
                        definition: componentDefinition
                    })
                }
            },
            renderEditor(componentDefinition: ComponentDefinition<T>) {
                return function (props: any) {
                    if (ComponentEditor) {
                        return React.createElement(ComponentEditor, {
                            ...props,
                            definition: componentDefinition
                        });
                    } else {
                        return (<></>);
                    }
                }
            }
        }

        //const factory: ComponentFactory<T> = new Factory();
        FactoryRenders.register(render, factory.type)
        FormStudio.registerFactory(factory)
    }
}

export const LayoutWrapper = require('./LayoutWrapper').default;
export const ComponentWrapper = require('./ComponentWrapper').default;
