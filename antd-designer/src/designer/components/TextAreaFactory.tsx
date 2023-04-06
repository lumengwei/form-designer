import React from 'react';
import {Input} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {PropsEditor} from '../widgets/PropsEditor';
import {ReactComponentProps, ReactComponentState} from "../types";
import {TextAreaProps} from "../../../../src/props";
import TextAreaFactory from "@@/factory/TextAreaFactory";

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

/**
 * 注册
 */
FactoryRegister(TextAreaComponent, TextAreaComponentEditor)(TextAreaFactory)

