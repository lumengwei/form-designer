import React, {Component, ComponentClass} from 'react';
import {ComponentDefinition, ComponentFactoryConstructor, ComponentFactory} from "../../../src/types";
import FormStudio from "../../../src/FormStudio";
import FactoryRenders from "./FactoryRenders";
import {ComponentFactoryRender, ReactComponentProps} from "./types";


/**
 * 注册ComponentFactory
 * @param Factory
 * @constructor
 */
export function FactoryRegister<T>(Component: ComponentClass, ComponentEditor?: ComponentClass<ReactComponentProps<T>>) {

    return function FactoryWrapper(Factory: ComponentFactoryConstructor<T>) {
        const prototype = Object.getPrototypeOf(Factory);


        const render: ComponentFactoryRender<T, any> = {
            renderComponent(componentDefinition: ComponentDefinition<T>) {
                return function (props: any) {
                    return <Component {...props} definition={componentDefinition}/>
                }
            },
            renderEditor(componentDefinition: ComponentDefinition<T>) {
                return function (props: any) {
                    if (ComponentEditor) {
                        return <ComponentEditor {...props} definition={componentDefinition}/>
                    } else {
                        return (<></>);
                    }
                }
            }
        }

        const factory: ComponentFactory<any> = Object.create(prototype);
        FactoryRenders.register<ComponentFactory<any>>(render, factory.type)
        FormStudio.registerFactory(factory)
    }
}
