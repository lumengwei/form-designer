import React from "react";
import {Button, Checkbox, Form, Input, Radio} from "antd";
import {PropsEditor} from "./PropsEditor";
import {OptionType} from "../../../../src/props";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";


type OptionGroupProps = {
    options: OptionType[]
}

export abstract class OptionGroupEditor<T extends OptionGroupProps> extends PropsEditor<T> {

    protected removeOption(index: number) {
        const definition = this.props.definition;
        const props: OptionGroupProps = definition.props!;
        props.options.splice(index, 1);
        this.forceUpdate();
        this.refreshFormView();
    }

    protected addOption(index: number) {
        const definition = this.props.definition;
        const props: OptionGroupProps = definition.props!;
        props.options.splice(index + 1, 0, {
            label: `显示值${index + 1}`,
            value: `真值${index + 1}`,
            checked: false,
            disabled: false
        });
        this.forceUpdate();
        this.refreshFormView();
    }

    protected renderOptions() {
        const definition = this.props.definition;
        const props: OptionGroupProps = definition.props!;
        return props.options.map((item, index) => {
            return (
                <>
                    <Form.Item
                        label={index !== 0 ? null : "可选值：显示值 -- 真值 -- 默认-- 禁用"}
                        style={{marginBottom: 0}}
                    >
                        <Form.Item
                            name={`props.options[${index}].label`}
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
                            name={`props.options[${index}].value`}
                            initialValue={item.value}
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 55px)',
                                marginBottom: 0,
                                marginRight: '3px'
                            }}>
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={`props.options[${index}].checked`}
                            initialValue={item.checked}
                            style={{display: 'inline-block', marginBottom: 0, marginRight: '3px'}}
                            valuePropName='checked'
                        >
                            <Radio.Group name='checkedIndex'>
                                <Radio value={index}/>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name={`props.options[${index}].disabled`}
                            initialValue={item.disabled}
                            style={{display: 'inline-block', marginBottom: 0, marginRight: '3px'}}
                            valuePropName='checked'
                        >
                            <Checkbox/>
                        </Form.Item>
                        <Form.Item style={{display: 'inline-block', width: '48px', marginBottom: 0}}>
                            <Button type="primary" shape="circle" icon={<PlusOutlined/>} size="small"
                                    onClick={() => this.addOption(index)}/>
                            {index !== 0 ? (<Button danger shape="circle" icon={<CloseOutlined/>} size="small"
                                                    onClick={() => this.removeOption(index)}/>
                            ) : null}
                        </Form.Item>
                    </Form.Item>
                </>
            );
        })
    }
}
