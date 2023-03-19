import React, {PureComponent} from 'react';
import {Button, Checkbox, Form, Input, Radio,} from 'antd';
import {FactoryRegister, ComponentWrapper} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {PropsEditor} from '../widgets/PropsEditor';
import {CheckboxProps, RadioProps} from "../../../../src/props";
import {ComponentEditor, ReactComponentProps, ReactComponentState} from "../types";
import {ComponentFactory, FactoryGroup} from "../../../../src/types";

const RadioGroup = Radio.Group;

@ComponentWrapper
class RadioComponent extends ReactComponent<ReactComponentProps<RadioProps>, RadioProps, ReactComponentState> {

    render() {
        const definition = this.props.definition;
        const props: RadioProps = definition.props!;
        const defaultValue = props.options.filter(item => {
            return item.checked;
        }).map(item => {
            return item.value;
        })[0];

        return (
            <RadioGroup options={props.options} value={defaultValue}/>
        )
    }
}

class RadioComponentEditor extends PureComponent<ReactComponentProps<RadioProps>>
    implements ComponentEditor<ReactComponentProps<RadioProps>, RadioProps> {

    onChange(allValues: any) {
        const {definition: {props}, definition} = this.props;

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
                    <Form.Item style={{
                        display: 'inline-block',
                        width: 'calc(50% - 55px)',
                        marginBottom: 0,
                        marginRight: '3px'
                    }}>
                        <Input/>)
                    </Form.Item>
                    <Form.Item
                        initialValue={item.value}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 55px)',
                            marginBottom: 0,
                            marginRight: '3px'
                        }}>
                        <Input/>
                    </Form.Item>
                    <Form.Item style={{display: 'inline-block', marginBottom: 0, marginRight: '3px'}}>
                        <RadioGroup name='checkedIndex'>
                            <Radio value={index}/>
                        </RadioGroup>
                    </Form.Item>
                    <Form.Item initialValue={item.disabled}
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
            <PropsEditor {...this.props}>
                {this.renderOptions()}
            </PropsEditor>
        );
    }
}

@FactoryRegister(RadioComponent, RadioComponentEditor)
class RadioFactory implements ComponentFactory<RadioProps> {
    readonly type = "Radio"
    readonly group = FactoryGroup.Component;

    title = "单选框"

    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition() {
        return {
            type: this.type,
            title: this.title,
            fieldDef: {
                fieldTitle: this.title,
                fieldType: '',
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

