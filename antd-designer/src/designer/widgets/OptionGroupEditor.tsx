import React from "react";
import {Button, Checkbox, Form, Input, Radio} from "antd";
import {PropsEditor} from "./PropsEditor";
import {OptionType} from "../../../../src/props";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";

const styles = require('@@/style/component.module.less')

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
        const opts = props.options.map((item, index) => {
            return (
                <tr>
                    <td>
                        <Form.Item
                            name={`props.options[${index}].label`}
                            initialValue={item.label}
                            style={{
                                display: 'inline-block',
                                marginBottom: 0,
                                marginRight: '3px'
                            }}>
                            <Input/>
                        </Form.Item>
                    </td>
                    <td>
                        <Form.Item
                            name={`props.options[${index}].value`}
                            initialValue={item.value}
                            style={{
                                display: 'inline-block',
                                marginBottom: 0,
                                marginRight: '3px'
                            }}>
                            <Input/>
                        </Form.Item>
                    </td>
                    <td>
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
                    </td>
                    <td>
                        <Form.Item
                            name={`props.options[${index}].disabled`}
                            initialValue={item.disabled}
                            style={{display: 'inline-block', marginBottom: 0, marginRight: '3px'}}
                            valuePropName='checked'
                        >
                            <Checkbox/>
                        </Form.Item>
                    </td>
                    <td>
                        <Form.Item style={{display: 'inline-block', width: '48px', marginBottom: 0}}>
                            {/*<Button type="primary" shape="circle" icon={<PlusOutlined/>} size="small"*/}
                            {/*        onClick={() => this.addOption(index)}/>*/}
                            {index !== 0 ? (<Button type="text" danger icon={<DeleteOutlined/>} size="small"
                                                    onClick={() => this.removeOption(index)}/>
                            ) : null}
                        </Form.Item>
                    </td>
                </tr>
            );
        })

        return (
            <div>
                <div className={styles.optionsTools}>
                    <Button size="small" icon={<PlusOutlined/>}
                            onClick={() => this.addOption(props.options.length - 1)}>
                        添加
                    </Button>
                </div>
                <table className={styles.options}>
                    <colgroup>
                        <col style={{width: '200px'}}/>
                        <col style={{width: '200px'}}/>
                        <col style={{width: '50px'}}/>
                        <col style={{width: '50px'}}/>
                        <col style={{width: '50px'}}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>
                            显示值
                        </th>
                        <th>
                            真值
                        </th>
                        <th>
                            默认
                        </th>
                        <th>
                            禁用
                        </th>
                        <th>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {opts}
                    </tbody>
                </table>
            </div>
        )
    }
}
