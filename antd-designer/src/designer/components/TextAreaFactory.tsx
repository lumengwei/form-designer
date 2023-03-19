import React, {PureComponent} from 'react';
import {Input} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {getErasure} from '../../util/MiscUtil';
import {PropsEditor} from '../widgets/PropsEditor';
import {ComponentEditor, ReactComponentProps, ReactComponentState} from "../types";
import {TextAreaProps} from "../../../../src/props";
import {FactoryGroup} from "../../../../src/types";

const TexArea = Input.TextArea;

@ComponentWrapper
class TextAreaComponent extends ReactComponent<ReactComponentProps<TextAreaProps>, TextAreaProps, ReactComponentState> {

    render() {
        const {definition: {props}} = this.props;
        return (
            <TexArea placeholder={props!.placeholder}/>
        )
    }
}

class TextAreaComponentEditor extends PureComponent<ReactComponentProps<TextAreaProps>>
    implements ComponentEditor<ReactComponentProps<TextAreaProps>, TextAreaProps> {

    onChange(allValues: any) {
        const {definition: {props}, definition} = this.props;
        definition.title = getErasure(allValues, 'title');

        return true;
    }

    render() {
        return (
            <PropsEditor {...this.props} />
        );
    }
}

@FactoryRegister(TextAreaComponent, TextAreaComponentEditor)
class TextAreaFactory {
    readonly type = "TextArea"
    readonly group = FactoryGroup.Component;
    title = "多行输入框"


    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition() {
        return {
            type: this.type,
            title: this.title,
            props: {
                placeholder: '请输入'
            },
        }
    }
}


export default TextAreaFactory;

