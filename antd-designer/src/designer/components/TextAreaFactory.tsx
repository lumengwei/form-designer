import React, {PureComponent} from 'react';
import {Input} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {getErasure} from '../../util/MiscUtil';
import {PropsEditor} from '../widgets/PropsEditor';
import {ComponentEditor, ReactComponentProps, ReactComponentState} from "../types";
import {RadioProps, SelectProps, TextAreaProps} from "../../../../src/props";
import {FactoryGroup, FieldFactory, FieldType} from "../../../../src/types";
import {makeComponentId, makeFieldId} from "../../../../src/utils";

const TexArea = Input.TextArea;

@ComponentWrapper
class TextAreaComponent extends ReactComponent<ReactComponentProps<TextAreaProps>, TextAreaProps, ReactComponentState> {

    override render() {
        const {definition: {props}} = this.props;
        return (
            <TexArea placeholder={props!.placeholder}/>
        )
    }
}

class TextAreaComponentEditor extends PropsEditor<TextAreaProps> {
    doRender() {
        return (
            <>
            </>
        );
    }
}

@FactoryRegister(TextAreaComponent, TextAreaComponentEditor)
class TextAreaFactory implements FieldFactory<TextAreaProps> {
    readonly type = "TextArea"
    readonly group = FactoryGroup.Component;
    title = "多行输入框"


    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition() {
        return {
            id: makeComponentId(),
            type: this.type,
            title: this.title,
            fieldDef: {
                fieldId: makeFieldId(),
                fieldType: 'varchar' as FieldType,
                fieldName: '',
            },
            props: {
                placeholder: '请输入'
            },
        }
    }
}


export default TextAreaFactory;

