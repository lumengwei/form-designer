import React from 'react';
import {Input} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {PropsEditor} from '../widgets/PropsEditor';
import {ReactComponentProps, ReactComponentState} from "../types";
import InputFactory from "@@/factory/InputFactory";

/**
 * 组件
 */
@ComponentWrapper
class InputComponent extends ReactComponent<ReactComponentProps<'Input'>, 'Input', ReactComponentState> {

    override render() {
        const {definition: {props}} = this.props;
        return (
            <Input placeholder={props!.placeholder}/>
        )
    }
}

/**
 * 组件属性编辑器
 */
class InputComponentEditor extends PropsEditor<'Input'> {
    doRender() {
        return (
            <></>
        );
    }
}

/**
 * 组件工厂
 */
FactoryRegister(InputComponent, InputComponentEditor)(InputFactory)

