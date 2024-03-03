import React from 'react';
import {Form, InputNumber, Rate} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {PropsEditor} from '../widgets/PropsEditor';
import {RateProps} from "@@/props";
import {ReactComponentProps, ReactComponentState} from "../types";
import RateFactory from "@@/factory/RateFactory";

@ComponentWrapper
class RateComponent extends ReactComponent<ReactComponentProps<'Rate'>, 'Rate', ReactComponentState> {

    override render() {
        const {definition: {props}} = this.props;
        return (
            <>
                <Rate
                    count={props!.count}
                />
            </>

        )
    }
}

class RateComponentEditor extends PropsEditor<'Rate'> {
    doRender() {
        const definition = this.props.definition;
        const props: RateProps = definition.props!;
        return (
            <Form.Item label="总数 1~10"
                       name="props.count"
                       initialValue={props.count}
                       rules={[{
                           type: 'number',
                           min: 1,
                           message: '不得小于1'
                       }, {
                           type: 'number',
                           max: 10,
                           message: '不得大于10'
                       }]}
            >
                <InputNumber/>
            </Form.Item>
        );
    }
}

FactoryRegister(RateComponent, RateComponentEditor)(RateFactory)

