import React, {PureComponent} from 'react';
import {Form, InputNumber} from 'antd';
import {Layout} from '../reactComponent';
import {FactoryRegister, LayoutWrapper} from '../wrapper';
import FormStudio from "../../../../src/FormStudio";
import {ComponentDefinition, ComponentFactory} from "../../../../src/types";
import {ColumnLayoutProps} from "../../../../src/props";
import {ComponentEditor, ReactComponentGroupState, ReactComponentProps} from "../types";
import FactoryRenders from "../FactoryRenders";


@LayoutWrapper()
class ColumnLayout extends Layout<ReactComponentProps<ColumnLayoutProps>, ColumnLayoutProps, ReactComponentGroupState<ColumnLayoutProps>> {

    renderColumns() {
        const LinearLayoutFactory = FormStudio.getFactory("LinearLayout")
        const render = FactoryRenders.getRender("LinearLayout")
        const {definition: {props, children}} = this.props;

        let es = props!.columnNum - children!.length;
        if (es !== 0) {
            if (es < 0) {
                es = Math.abs(es);
                children!.splice(children!.length - es, es);
            } else {
                while (es !== 0) {
                    children!.splice(children!.length, 0, LinearLayoutFactory.createComponentDefinition());
                    es -= 1;
                }
            }
        }

        return children!.map(item => {
            return (
                <div className="cell">
                    {render.renderComponent(item)({})}
                </div>)
        })

    }

    render() {
        return (
            <div className="column-layout">{this.renderColumns()}</div>
        )
    }
}

class ColumnComponentEditor extends PureComponent<ReactComponentProps<ColumnLayoutProps>>
    implements ComponentEditor<ReactComponentProps<ColumnLayoutProps>, ColumnLayoutProps> {

    onChange(allValues: any) {
        const {definition: {props}} = this.props;
    }

    render() {
        const {definition: {props}} = this.props;
        return (
            <Form>
                <Form.Item
                    initialValue={props!.columnNum}
                    label="列数目"
                    style={{marginBottom: 0}}
                    rules={[{
                        type: 'number',
                        min: 1,
                        message: '不得小于1'
                    }, {
                        type: 'number',
                        max: 10,
                        message: '不得小于10'
                    }]}
                >
                    <InputNumber/>
                </Form.Item>
            </Form>);
    }
}

@FactoryRegister(ColumnLayout, ColumnComponentEditor)
class ColumnLayoutFactory implements ComponentFactory<ColumnLayoutProps> {
    readonly type = "ColumnLayout"

    title = "列布局"


    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition(): ComponentDefinition<ColumnLayoutProps> {
        const LinearLayoutFactory = FormStudio.getFactory("LinearLayout")
        return {
            type: this.type,
            title: this.title,
            props: {
                'columnNum': 2
            },
            children: [
                LinearLayoutFactory.createComponentDefinition(),
                LinearLayoutFactory.createComponentDefinition()
            ]
        }
    }
}


export default ColumnLayoutFactory;

