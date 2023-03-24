import React from 'react';
import {Input} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {PropsEditor} from '../widgets/PropsEditor';
import {ReactComponentProps, ReactComponentState} from "../types";
import {FactoryGroup, FieldFactory, FieldType} from "../../../../src/types";
import {InputProps} from "../../../../src/props";
import {makeComponentId, makeFieldId} from "../../../../src/utils";

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
class InputComponentEditor extends PropsEditor<InputProps> {
    doRender() {
        return (
            <></>
        );
    }
}

/**
 * 组件工厂
 */
@FactoryRegister(InputComponent, InputComponentEditor)
class InputFactory implements FieldFactory<InputProps> {
    readonly type = "Input"
    readonly group = FactoryGroup.Component;

    title = "单行输入框"

    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition() {
        return {
            id: makeComponentId(),
            type: this.type,
            title: this.title,
            fieldDef: {
                fieldId: makeFieldId(),
                fieldType: 'varchar' as FieldType,
                fieldName: ''
            },
            props: {
                placeholder: '请输入'
            },
        }
    }
}

export default InputFactory;

