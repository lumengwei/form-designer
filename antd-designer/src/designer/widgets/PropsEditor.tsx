import React, {PropsWithChildren, PureComponent} from "react";
import {Form, Input, InputNumber} from "antd";
import {FieldNameInput} from "./FieldNameInput";
import {ReactComponentProps} from "../types";

export class PropsEditor extends PureComponent<PropsWithChildren<ReactComponentProps<any>>> {

    /**
     * 长度限制
     * @returns {*}
     */
    renderLengthLimit() {
        const props = this.props.definition.props;
        if (!this.props.hasOwnProperty('lengthLimit')) {
            return null;
        }

        return (
            <Form.Item
                style={{marginBottom: 0}}
            >
                <Form.Item
                    initialValue={props.minLength}
                    label="最小长度"
                    style={{display: 'inline-block', width: 'calc(50% - 12px)', marginBottom: 0}}
                    rules={[{
                        type: 'number',
                        min: 1,
                        message: '不得小于1'
                    }]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item
                    initialValue={props.maxLength}
                    label="最大长度"
                    style={{display: 'inline-block', width: 'calc(50% - 12px)', marginBottom: 0}}
                    rules={[{
                        type: 'number',
                        min: 1,
                        message: '不得小于1'
                    }]}
                >
                    <InputNumber/>
                </Form.Item>
            </Form.Item>
        );
    }

    renderPlaceholder() {
        const props = this.props.definition.props;

        if (!this.props.hasOwnProperty('placeholder')) {
            return null;
        }

        return (
            <Form.Item initialValue={props.placeholder} label="占位符" style={{marginBottom: 0}}>
                <Input min={1}/>
            </Form.Item>
        );
    }

    render() {
        const {definition, children} = this.props;


        return (
            <Form>
                <FieldNameInput/>
                <Form.Item initialValue={definition.title} label="标题" style={{marginBottom: 0}}>
                    <Input placeholder="标题"/>
                </Form.Item>
                {this.renderPlaceholder()}
                {this.renderLengthLimit()}
                {children}
            </Form>
        );
    }

}
