import React, {PureComponent} from 'react'
import {Tabs} from 'antd';
import FormView from './FormView';
import componentStyle from '../../../src/style/component.less';
import ComponentPropsEditor from './ComponentPropsEditor';
import FormStudio from "../../../src/FormStudio";
import {Component, FactoryGroup} from "../../../src/types";
import {draggable} from "../lib/sortable";
import FormPropsEditor from "./FormPropsEditor";

require('../../../src/style/component.less')

require('./components');

require('./layout');

class FormComponent extends PureComponent<Component> {

    private _node: HTMLElement | null = null;

    ref = (node: HTMLElement | null) => {
        this._node = node;
    }

    componentDidMount() {
        const {type} = this.props;

        draggable(this._node, type)
    }

    render() {
        const {title} = this.props;
        return (
            <div
                draggable
                className={componentStyle.widgetItem}
                ref={this.ref}
            >
                {title}
            </div>
        )
    }
}


class FormDesigner extends PureComponent {

    renderChild(group: FactoryGroup) {
        return FormStudio.getFactoryList(group).map(item => {
            return <FormComponent title={item.title} type={item.type} key={item.type}/>
        })
    }

    render() {
        return (
            <div className="form-designer">
                <div className="form-widget">
                    <Tabs>
                        <Tabs.TabPane tab="表单组件" key='1'>
                            <div className={componentStyle.widgetList}>
                                {this.renderChild(FactoryGroup.Component)}
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="布局" key='2'>
                            <div className={componentStyle.widgetList}>
                                {this.renderChild(FactoryGroup.Layout)}
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
                <div className="form-view-wrapper">
                    <FormView formDefinition={FormStudio.fromDef}/>
                </div>

                <div className="form-editor">
                    <Tabs>
                        <Tabs.TabPane tab="控件属性" key='1'>
                            <ComponentPropsEditor/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="表单属性" key='2'>
                            <FormPropsEditor definition={FormStudio.fromDef}/>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default FormDesigner;
