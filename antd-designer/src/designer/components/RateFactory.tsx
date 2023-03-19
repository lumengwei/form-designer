import React, {PureComponent} from 'react';
import {Form, InputNumber, Rate} from 'antd';
import {FactoryRegister, ComponentWrapper} from '../wrapper';
import {ReactComponent} from '../ReactComponent';
import {PropsEditor} from '../widgets/PropsEditor';
import {RateProps} from "../../../../src/props";
import {ComponentFactory, FactoryGroup} from "../../../../src/types";
import {ComponentEditor, ReactComponentProps, ReactComponentState} from "../types";

@ComponentWrapper
class RateComponent extends ReactComponent<ReactComponentProps<RateProps>, RateProps, ReactComponentState> {

    render() {
        const {definition: {props}} = this.props;
        return (
            <Rate
                count={props!.count}
            />
        )
    }
}

class RateComponentEditor extends PureComponent<ReactComponentProps<RateProps>>
    implements ComponentEditor<ReactComponentProps<RateProps>, RateProps> {


    onChange(allValues: any) {
        const {definition: {props}, definition} = this.props;

        return true;
    }

    render() {
        const definition = this.props.definition;
        const props: RateProps = definition.props!;
        return (
            <PropsEditor {...this.props}>
                <Form.Item label="总数 1~10"
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
            </PropsEditor>
        );
    }
}

@FactoryRegister(RateComponent, RateComponentEditor)
class RateFactory implements ComponentFactory<RateProps> {
    readonly type = "Rate"
    readonly group = FactoryGroup.Component;
    title = "评分"

    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition() {
        return {
            type: this.type,
            title: this.title,
            props: {
                count: 5
            },
        }
    }
}


export default RateFactory

