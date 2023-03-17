import React, {Component, ComponentClass} from 'react';
import {Form} from 'antd';
import {ComponentDefinition, ComponentFactory} from "../../../src/types";
import FormStudio from "../../../src/FormStudio";


type ComponentEditorClass = typeof ComponentEditor;

export function ComponentEditor(component: ComponentClass) {
    return Form.create({
        onValuesChange(props, values, allValues) {
            if (props.onValuesChange) {// PropsEditor#onValuesChange
                props.onValuesChange(props, values, allValues)
            }
        }
    })(component);
}


/**
 * 注册ComponentFactory
 * @param Factory
 * @constructor
 */
export function FactoryRegister(Component: ComponentClass, ComponentEditor?: ComponentEditorClass) {

    return function FactoryWrapper<T>(Factory: ComponentFactory<T>) {
        const prototype = Object.getPrototypeOf(Factory);
        if (Component) {
            prototype.renderComponent = (componentDefinition: ComponentDefinition<T>) => {
                return function (props: any) {
                    return <Component {...props} definition={componentDefinition}/>
                }
            };
        }

        if (ComponentEditor) {
            prototype.renderEditor = (componentDefinition: ComponentDefinition<T>) => {
                return function (props: any) {
                    return <ComponentEditor {...props} definition={componentDefinition}/>
                }
            }
        }


        FormStudio.registerFactory(new Factory())
    }
}
