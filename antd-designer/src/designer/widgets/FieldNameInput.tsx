import {Form, Input} from "antd";
import React from "react";

export function FieldNameInput(props: any) {
    return (
        <Form.Item label="名称" style={{marginBottom: 0}}
                   rules={[{
                       pattern: /^[a-zA-Z_]+/g,
                       message: '只能输入字母或下划线'
                   }, {
                       max: 30,
                       message: '至多输入30个字符'
                   }, {
                       min: 5,
                       message: '至少输入5个字符'
                   }]}
        >
            <Input placeholder="必须是字母或下划线，长度在5~30"/>
        </Form.Item>
    )
}
