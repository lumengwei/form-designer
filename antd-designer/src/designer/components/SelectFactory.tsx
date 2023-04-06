import React from 'react';
import {Select} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {SelectProps} from "../../../../src/props";
import {ReactComponentProps, ReactComponentState} from "../types";
import {FactoryGroup, FieldFactory, FieldType} from "../../../../src/types";
import {makeComponentId, makeFieldId} from "../../../../src/utils";
import {OptionGroupEditor} from "../widgets/OptionGroupEditor";
import SelectFactory from "@@/factory/SelectFactory";

@ComponentWrapper
class SelectComponent extends ReactComponent<ReactComponentProps<SelectProps>, SelectProps, ReactComponentState> {

    renderOptions() {
        const {definition: {props}} = this.props;
        return props!.options.map(item => {
            return <Select.Option value={item.value} disabled={item.disabled}>{item.label}</Select.Option>
        })
    }

    override render() {
        const {definition: {props}} = this.props;
        const defaultValue = props!.options.filter(item => {
            return item.checked;
        }).map(item => {
            return item.value;
        });

        return (
            <Select
                allowClear
                showSearch
                style={{width: '100%'}}
                placeholder={props!.placeholder}
                value={defaultValue}
                filterOption={(input, option) => option!.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {this.renderOptions()}
            </Select>
        )
    }
}

class SelectComponentEditor extends OptionGroupEditor<SelectProps> {

    doRender() {
        return (
            <>
                {this.renderOptions()}
            </>
        );
    }
}

FactoryRegister(SelectComponent, SelectComponentEditor)(SelectFactory)

