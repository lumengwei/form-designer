import React, {PureComponent} from 'react';
import {Form, InputNumber} from 'antd';
import {Layout} from '../reactComponent';
import {FactoryRegister, LayoutWrapper} from '../wrapper';
import FormStudio from "../../../../src/FormStudio";
import {ComponentDefinition, ComponentFactory, FactoryGroup} from "../../../../src/types";
import {ColumnLayoutProps} from "../../../../src/props";
import {ComponentEditor, ReactComponentGroupState, ReactComponentProps} from "../types";
import FactoryRenders from "../helper/FactoryRenders";
import {sortable} from "../../lib/sortable";


@LayoutWrapper()
class ColumnLayout extends Layout<ReactComponentProps<ColumnLayoutProps>, ColumnLayoutProps, ReactComponentGroupState<ColumnLayoutProps>> {

    renderColumns() {

        const {definition: {props, children}} = this.props;

        let es = props!.columnNum - children!.length;
        if (es !== 0) {
            if (es < 0) {
                es = Math.abs(es);
                children!.splice(children!.length - es, es);
            } else {
                while (es !== 0) {
                    children!.splice(children!.length, 0);
                    es -= 1;
                }
            }
        }


        const segments = [];

        for (let i = 0; i < props!.columnNum; i++) {
            if (children![i]) {
                const factory = FormStudio.getFactory(children![i].type)
                const render = FactoryRenders.getRender(children![i].type)
                segments.push((<div className="cell">
                    {render.renderComponent(children![i])(factory.createComponentDefinition)}
                </div>))
            } else {
                const ref = (node: HTMLDivElement) => {
                    if (node) {
                        sortable(node, this)
                    }
                };
                segments.push((<div className="cell" ref={ref}/>))
            }

        }

        return segments;
    }

    render() {
        return (
            <div className="column-layout">{this.renderColumns()}</div>
        )
    }
}

class ColumnComponentEditor extends PureComponent
    <ReactComponentProps<ColumnLayoutProps>>
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
    readonly group = FactoryGroup.Layout;
    title = "列布局"


    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition(): ComponentDefinition<ColumnLayoutProps> {
        return {
            type: this.type,
            title: this.title,
            props: {
                'columnNum': 2
            },
            children: []
        }
    }
}


export default ColumnLayoutFactory;

