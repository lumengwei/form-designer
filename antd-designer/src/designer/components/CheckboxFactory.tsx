import React from 'react';
import {Checkbox} from 'antd';
import {ReactComponent} from '../ReactComponent';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {CheckboxProps} from "../../../../src/props";
import {ReactComponentProps, ReactComponentState} from "../types";
import {OptionGroupEditor} from "../widgets/OptionGroupEditor";
import CheckboxFactory from "@@/factory/CheckboxFactory";

const CheckboxGroup = Checkbox.Group;

@ComponentWrapper
class CheckboxComponent extends ReactComponent<ReactComponentProps<'Checkbox'>, 'Checkbox', ReactComponentState> {

    override render() {
        const definition = this.props.definition;
        const props: CheckboxProps = definition.props!;
        const defaultValue = props.options.filter(item => {
            return item.checked;
        }).map(item => {
            return item.value;
        });

        return (
            <CheckboxGroup options={props.options} value={defaultValue}/>
        )
    }
}

class CheckboxComponentEditor extends OptionGroupEditor<'Checkbox'> {

    doRender() {
        return (
            <>
                {this.renderOptions()}
            </>
        );
    }
}

FactoryRegister(CheckboxComponent, CheckboxComponentEditor)(CheckboxFactory)
