import React, {PureComponent} from 'react'
import {FactoryRenders, FormHelper} from "./helper";
import {ReactComponentGroupState} from "./types";
import {ComponentDefinition, FormDefinition} from "../../../src/types";
import {Form, FormInstance, Input, InputNumber} from "antd";
import {mergeObject} from "../../../src/utils";
import TextArea from "antd/es/input/TextArea";

require('../../../src/style/formView.less');

type FormPropsEditorProps = {
    definition: FormDefinition;
}

/**
 * 属性编辑器
 */
class FormPropsEditor extends PureComponent<FormPropsEditorProps, ReactComponentGroupState<any>> {

    private readonly refForm = React.createRef<FormInstance>();


    onValuesChange(changedValues: any) {
        console.log('onValuesChange', changedValues)
        const {definition} = this.props;
        for (const field of Object.keys(changedValues)) {
            mergeObject(field, changedValues[field], definition);
        }

        FormHelper.formView!.forceRender();
    }

    override render() {
        const {definition} = this.props;
        return (
            <div>
                <Form
                    ref={this.refForm}
                    size="middle"
                    layout="vertical"
                    onValuesChange={(changedValues) => this.onValuesChange(changedValues)}
                >
                    <Form.Item
                        initialValue={definition.title}
                        label="标题"
                        name="title"
                        rules={[
                            {required: true}
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        initialValue={definition.width}
                        label="宽度"
                        name="width"
                    >
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item
                        initialValue={definition.description}
                        label="描述"
                        name="description"
                    >
                        <TextArea rows={4} placeholder="请输入描述"/>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default FormPropsEditor;
