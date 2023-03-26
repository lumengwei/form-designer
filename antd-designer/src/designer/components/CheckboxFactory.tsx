import React from 'react';
import {Checkbox} from 'antd';
import {ReactComponent} from '../ReactComponent';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {FactoryGroup, FieldFactory, FieldType} from "../../../../src/types";
import {CheckboxProps} from "../../../../src/props";
import {ReactComponentProps, ReactComponentState} from "../types";
import {makeComponentId, makeFieldId} from "../../../../src/utils";
import {OptionGroupEditor} from "../widgets/OptionGroupEditor";

const CheckboxGroup = Checkbox.Group;

@ComponentWrapper
class CheckboxComponent extends ReactComponent<ReactComponentProps<CheckboxProps>, CheckboxProps, ReactComponentState> {

    render() {
        const definition = this.props.definition;
        const props: CheckboxProps = definition.props!;
        const defaultValue = props.options.filter(item => {
            return item.checked;
        }).map(item => {
            return item.value;
        });

        return (
            <CheckboxGroup options={props.options} value={defaultValue}/>
        )
    }
}

class CheckboxComponentEditor extends OptionGroupEditor<CheckboxProps> {

    doRender() {
        return (
            <>
                {this.renderOptions()}
            </>
        );
    }
}

@FactoryRegister(CheckboxComponent, CheckboxComponentEditor)
export class CheckboxFactory implements FieldFactory<CheckboxProps> {
    readonly type = "Checkbox"

    readonly group = FactoryGroup.Component;

    title = "多选框"

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
                fieldType: "array" as FieldType,
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

