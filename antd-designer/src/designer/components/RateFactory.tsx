import React from 'react';
import {Form, InputNumber, Rate} from 'antd';
import {ComponentWrapper, FactoryRegister} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {PropsEditor} from '../widgets/PropsEditor';
import {RateProps} from "../../../../src/props";
import {FactoryGroup, FieldFactory, FieldType} from "../../../../src/types";
import {ReactComponentProps, ReactComponentState} from "../types";
import {makeComponentId, makeFieldId} from "../../../../src/utils";
import RateFactory from "@@/factory/RateFactory";

@ComponentWrapper
class RateComponent extends ReactComponent<ReactComponentProps<RateProps>, RateProps, ReactComponentState> {

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

class RateComponentEditor extends PropsEditor<RateProps> {
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

