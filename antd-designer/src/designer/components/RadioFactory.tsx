import React from 'react';
import {Radio,} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {RadioProps} from "@@/props";
import {ReactComponentProps, ReactComponentState} from "../types";
import {OptionGroupEditor} from "../widgets/OptionGroupEditor";
import RadioFactory from "@@/factory/RadioFactory";


@ComponentWrapper
class RadioComponent extends ReactComponent<ReactComponentProps<'Radio'>, 'Radio', ReactComponentState> {

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

class RadioComponentEditor extends OptionGroupEditor<'Radio'> {

    doRender() {
        return (
            <>
                {this.renderOptions()}
            </>
        );
    }
}

FactoryRegister(RadioComponent, RadioComponentEditor)(RadioFactory)

