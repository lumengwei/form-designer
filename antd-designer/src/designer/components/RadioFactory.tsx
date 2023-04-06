import React from 'react';
import {Radio,} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {RadioProps} from "../../../../src/props";
import {ReactComponentProps, ReactComponentState} from "../types";
import {FactoryGroup, FieldFactory, FieldType} from "../../../../src/types";
import {makeComponentId, makeFieldId} from "../../../../src/utils";
import {OptionGroupEditor} from "../widgets/OptionGroupEditor";
import RadioFactory from "@@/factory/RadioFactory";


@ComponentWrapper
class RadioComponent extends ReactComponent<ReactComponentProps<RadioProps>, RadioProps, ReactComponentState> {

    override render() {
        const definition = this.props.definition;
        const props: RadioProps = definition.props!;
        const defaultValue = props.options.filter(item => {
            return item.checked;
        }).map(item => {
            return item.value;
        })[0] || null;

        const opts = props.options.map(it => {
            return (<Radio value={it.value} disabled={it.disabled}>{it.label}</Radio>)
        })
        return (
            <Radio.Group value={defaultValue}>
                {opts}
            </Radio.Group>
        )
    }
}

class RadioComponentEditor extends OptionGroupEditor<RadioProps> {

    doRender() {
        return (
            <>
                {this.renderOptions()}
            </>
        );
    }
}

FactoryRegister(RadioComponent, RadioComponentEditor)(RadioFactory)

