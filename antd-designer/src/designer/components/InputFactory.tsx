import React, {PureComponent} from 'react';
import {Input} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../reactComponent';
import {getErasure} from '../../util/MiscUtil';
import {PropsEditor} from '../fragements';
import {ComponentEditor, ReactComponentProps, ReactComponentState} from "../types";
import {ComponentDefinition, ComponentFactory} from "../../../../src/types";
import {InputProps} from "../../../../src/props";

/**
 * 组件
 */
@ComponentWrapper
class InputComponent extends ReactComponent<ReactComponentProps<InputProps>, InputProps, ReactComponentState> {

    render() {
        const {definition: {props}} = this.props;
        return (
            <Input placeholder={props!.placeholder}/>
        )
    }
}

/**
 * 组件属性编辑器
 */
class InputComponentEditor extends PureComponent<ReactComponentProps<InputProps>>
    implements ComponentEditor<ReactComponentProps<InputProps>, InputProps> {

    /**
     * 当编辑器改变时，此方法被调用
     * @param _
     * @param allValues
     * @returns {boolean}
     */
    onChange(allValues: ComponentDefinition<InputProps>) {
        const definition: ComponentDefinition<InputProps> = this.props.definition;
        definition.title = getErasure(allValues, 'title');

        return true;
    }

    render() {
        return (
            <PropsEditor {...this.props} lengthLimit placeholder/>
        );
    }
}

/**
 * 组件工厂
 */
@FactoryRegister(InputComponent, InputComponentEditor)
class InputFactory implements ComponentFactory<InputProps> {
    type = "Input"

    title = "单行输入框"

    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition() {
        return {
            type: this.type,
            title: this.title,
            props: {
                placeholder: '请输入'
            },
        }
    }
}

export default InputFactory;

