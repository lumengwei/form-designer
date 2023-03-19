import React, {PureComponent} from 'react';
import {Button, Checkbox, Form, Input, Select} from 'antd';
import {FactoryRegister, ComponentWrapper} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {getErasure} from '../../util/MiscUtil';
import {PropsEditor} from '../widgets/PropsEditor';
import {CheckboxProps, SelectProps} from "../../../../src/props";
import {ComponentEditor, ReactComponentProps, ReactComponentState} from "../types";
import {ComponentFactory, FactoryGroup} from "../../../../src/types";

@ComponentWrapper
class SelectComponent extends ReactComponent<ReactComponentProps<SelectProps>, SelectProps, ReactComponentState> {

    renderOptions() {
        const {definition: {props}} = this.props;
        return props!.options.map(item => {
            return <Select.Option value={item.value} disabled={item.disabled}>{item.label}</Select.Option>
        })
    }

    render() {
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

class SelectComponentEditor extends PureComponent<ReactComponentProps<SelectProps>>
    implements ComponentEditor<ReactComponentProps<SelectProps>, SelectProps> {


    onChange(allValues: any) {
        const {definition: {props}, definition} = this.props;
        definition.title = getErasure(allValues, 'title');

        return true;
    }

    removeOption(index: number) {
        const definition = this.props.definition;
        const props: CheckboxProps = definition.props!;
        props.options.splice(index, 1);
        this.forceUpdate();
    }

    addOption(index: number) {
        const definition = this.props.definition;
        const props: CheckboxProps = definition.props!;
        props.options.splice(index + 1, 0, {
            label: `显示值${index + 1}`,
            value: `真值${index + 1}`,
            checked: false,
            disabled: false
        })
        this.forceUpdate();
    }

    renderOptions() {
        const definition = this.props.definition;
        const props: CheckboxProps = definition.props!;
        return props.options.map((item, index) => {
            return (
                <Form.Item
                    label={index !== 0 ? null : "可选值：显示值 -- 真值 -- 默认-- 禁用"}
                    style={{marginBottom: 0}}
                >
                    <Form.Item
                        initialValue={item.label}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 55px)',
                            marginBottom: 0,
                            marginRight: '3px'
                        }}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        initialValue={item.label}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 55px)',
                            marginBottom: 0,
                            marginRight: '3px'
                        }}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        initialValue={item.checked}
                        style={{display: 'inline-block', marginBottom: 0, marginRight: '3px'}}>
                        <Checkbox/>
                    </Form.Item>
                    <Form.Item
                        initialValue={item.disabled}
                        style={{display: 'inline-block', marginBottom: 0, marginRight: '3px'}}>
                        <Checkbox/>
                    </Form.Item>
                    <Form.Item style={{display: 'inline-block', width: '48px', marginBottom: 0}}>
                        <Button type="primary" shape="circle" icon="plus" size="small"
                                onClick={() => this.addOption(index)}/>
                        {index !== 0 ? (<Button danger shape="circle" icon="minus" size="small"
                                                onClick={() => this.removeOption(index)}/>
                        ) : null}
                    </Form.Item>
                </Form.Item>
            );
        })
    }

    render() {
        return (
            <PropsEditor {...this.props} >
                {this.renderOptions()}
            </PropsEditor>
        );
    }
}

@FactoryRegister(SelectComponent, SelectComponentEditor)
class SelectFactory implements ComponentFactory<SelectProps> {
    readonly type = "Select"
    readonly group = FactoryGroup.Component;
    title = "下拉选择"

    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition() {
        return {
            type: this.type,
            title: this.title,
            props: {
                placeholder: '请输入',
                options: [
                    {label: '显示值', value: '真值', checked: false, disabled: false}
                ]
            },
        }
    }
}


export default SelectFactory;

