import React from 'react';
import {Form, InputNumber} from 'antd';
import {Layout} from '../ReactComponent';
import {FactoryRegister, LayoutWrapper} from '../wrapper';
import FormStudio from "../../../../src/FormStudio";
import {ColumnLayoutProps} from "../../../../src/props";
import {ReactComponentGroupState, ReactComponentProps} from "../types";
import FactoryRenders from "../helper/FactoryRenders";
import {sortable} from "../../lib/sortable";
import {PropsEditor} from "../widgets/PropsEditor";
import ColumnLayoutFactory from "@@/factory/ColumnLayoutFactory";


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


        const segments: any[] = [];

        for (let i = 0; i < props!.columnNum; i++) {
            const def = this.getChildBySlot(i);
            if (def) {
                const factory = FormStudio.getFactory(def.type)
                const render = FactoryRenders.getRender(def.type)
                segments.push((<div className="cell" key={'cell-' + i}>
                    {render.renderComponent(factory.createComponentDefinition())({
                        onRemove: () => {
                            this.removeChildBySlot(i);
                        }
                    })}
                </div>))
            } else {
                const ref = (node: HTMLDivElement) => {
                    if (node) {
                        sortable(node, this, i, 1, true)
                    }
                };
                segments.push((<div className="cell" ref={ref} key={'cell-' + i}/>))
            }

        }

        return segments;
    }

    override render() {
        return (
            <div className="column-layout">{this.renderColumns()}</div>
        )
    }
}

class ColumnComponentEditor extends PropsEditor<ColumnLayoutProps> {

    doRender() {
        const {definition: {props}} = this.props;
        return (
            <>
                <Form.Item
                    initialValue={props!.columnNum}
                    label="列数目"
                    style={{marginBottom: 0}}
                    name="props.columnNum"
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
            </>);
    }
}

FactoryRegister(ColumnLayout, ColumnComponentEditor)(ColumnLayoutFactory)


