import React from 'react';
import {Button, Checkbox, Form, Input, Radio,} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {PropsEditor} from '../widgets/PropsEditor';
import {CheckboxProps, RadioProps} from "../../../../src/props";
import {ReactComponentProps, ReactComponentState} from "../types";
import {FactoryGroup, FieldFactory, FieldType} from "../../../../src/types";
import {makeComponentId, makeFieldId} from "../../../../src/utils";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {OptionGroupEditor} from "../widgets/OptionGroupEditor";


@ComponentWrapper
class RadioComponent extends ReactComponent<ReactComponentProps<RadioProps>, RadioProps, ReactComponentState> {

    render() {
        const definition = this.props.definition;
        const props: RadioProps = definition.props!;
        const defaultValue = props.options.filter(item => {
            return item.checked;
        }).map(item => {
            return item.value;
        })[0] || null;

        const opts = props.options.map(it => {
            return (<Radio value={it.value} disabled={it.disabled}>{it.label}</Radio>)
        })
        return (
            <Radio.Group value={defaultValue}>
                {opts}
            </Radio.Group>
        )
    }
}

class RadioComponentEditor extends OptionGroupEditor<RadioProps> {

    doRender() {
        return (
            <>
                {this.renderOptions()}
            </>
        );
    }
}

@FactoryRegister(RadioComponent, RadioComponentEditor)
class RadioFactory implements FieldFactory<RadioProps> {
    readonly type = "Radio"
    readonly group = FactoryGroup.Component;

    title = "单选框"

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
                fieldName: '',
            },
            props: {
                placeholder: '请输入',
                options: [
                    {label: '显示值', value: '真值', checked: false, disabled: false}
                ]
            },
        }
    }
}


export default RadioFactory;

