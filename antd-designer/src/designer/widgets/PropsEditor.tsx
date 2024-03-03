import React, {PropsWithChildren, PureComponent, ReactElement} from "react";
import {Form, FormInstance, Input, InputNumber, Select} from "antd";
import {ComponentEditor, ReactComponentProps} from "../types";
import {FormHelper} from "../helper";
import {mergeObject} from "@@/utils";
import {FieldType, FieldTypes, ComponentType} from "@@/types";

const lengthFields: FieldType[] = ['varchar', 'string'];
const scaleFields: FieldType[] = ['decimal'];

export type PropsEditorState = {
    scaleDisabled: boolean,
    lengthDisabled: boolean
}

export abstract class PropsEditor<T extends ComponentType> extends PureComponent<PropsWithChildren<ReactComponentProps<T>>, PropsEditorState>
    implements ComponentEditor<ReactComponentProps<T>, T> {

    private writeFields: string[] = ["props", "title", "fieldDef.fieldName", "fieldDef.fieldType"];

    private fieldTypeList: { value: string, label: string }[] = Object.keys(FieldTypes).map(field => {
        return {
            value: field,
            label: FieldTypes[field]
        }
    })

    private readonly refForm = React.createRef<FormInstance>();

    constructor(props: React.PropsWithChildren<ReactComponentProps<T>>, context: any) {
        super(props, context);
        this.state = {
            scaleDisabled: false,
            lengthDisabled: false,
        }
    }

    onValuesChange(changedValues: any, _allValues: any) {
        console.log('onValuesChange', changedValues)
        const {definition} = this.props;
        for (const field of Object.keys(changedValues)) {
            const canMerge = this.writeFields.filter(it => field.startsWith(it)).length;
            if (canMerge) {
                mergeObject(field, changedValues[field], definition);
            } else {
                throw new Error(`the field [${field}] is readonly`)
            }

        }

        this.refreshFormView();
    }

    /**
     * 强制刷新FormView
     * @protected
     */
    protected refreshFormView() {
        FormHelper.activeComponentIns!.forceRender();
    }


    onSelectType(val: string) {
        this.setState({
            scaleDisabled: scaleFields.indexOf(val as FieldType) < 0,
            lengthDisabled: lengthFields.indexOf(val as FieldType) < 0
        })
        this.refForm.current!.setFieldsValue({
            'fieldDef.length': null,
            'fieldDef.scale': null
        })
    }

    renderFieldDef() {
        const {definition} = this.props;
        const {lengthDisabled, scaleDisabled} = this.state
        if (definition.fieldDef) {
            return (
                <div>
                    <Form.Item
                        initialValue={definition.fieldDef.fieldName}
                        name="fieldDef.fieldName"
                        label="字段名"
                        rules={[
                            {
                                type: 'string',
                                max: 50,
                                min: 1,
                                message: '长度1~50'
                            }, {
                                required: true,
                                message: '字段必填'
                            }, {
                                type: 'string',
                                pattern: new RegExp("[a-zA-Z]*"),
                                message: '只能输入字母'
                            }
                        ]}
                    >
                        <Input placeholder="字段"/>
                    </Form.Item>
                    <div>
                        <Form.Item
                            initialValue={definition.fieldDef.fieldType}
                            label="类型"
                            name="fieldDef.fieldType"
                        >
                            <Select options={this.fieldTypeList} onChange={(val) => this.onSelectType(val)}/>
                        </Form.Item>
                        <Form.Item
                            initialValue={definition.fieldDef.length}
                            label="长度或精度"
                            name="fieldDef.length"
                        >
                            <InputNumber placeholder="长度或精度" disabled={lengthDisabled}/>
                        </Form.Item>
                        <Form.Item
                            initialValue={definition.fieldDef.scale}
                            label="小数"
                            name="fieldDef.scale"
                        >
                            <InputNumber placeholder="小数" disabled={scaleDisabled}/>
                        </Form.Item>
                    </div>

                    <Form.Item
                        initialValue={definition.title}
                        name="title"
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
                </div>
            )
        } else {
            return null;
        }
    }

    override render() {
        return (
            <>
                <Form
                    ref={this.refForm}
                    size="middle"
                    layout="vertical"
                    onValuesChange={(changedValues, allValues) => this.onValuesChange(changedValues, allValues)}
                >
                    {this.renderFieldDef()}
                    {this.doRender()}
                </Form>
            </>
        )
    }

    abstract doRender(): ReactElement;
}
