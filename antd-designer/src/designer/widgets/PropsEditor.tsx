import React, {PropsWithChildren, PureComponent} from "react";
import {Form, Input} from "antd";
import {ReactComponentProps} from "../types";

export class PropsEditor extends PureComponent<PropsWithChildren<ReactComponentProps<any>>> {

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
                <Form.Item
                    labelCol={{span: 3}}
                    initialValue={definition.title}
                    label="字段名"
                    rules={[
                        {
                            type: 'string',
                            max: 50,
                            min: 1,
                        }, {
                            required: true,
                        }, {
                            pattern: new RegExp("[a-zA-Z]*")
                        }
                    ]}
                >
                    <Input placeholder="字段"/>
                </Form.Item>
                <Form.Item labelCol={{span: 3}} initialValue={definition.title} label="类型">
                    <Input placeholder="类型"/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    initialValue={definition.title}
                    label="标题"
                    rules={[
                        {
                            type: 'string',
                            max: 50,
                            min: 1,
                        }, {
                            required: true,
                        }
                    ]}
                >
                    <Input placeholder="标题"/>
                </Form.Item>
                {this.renderPlaceholder()}
                {children}
            </Form>
        );
    }

}
