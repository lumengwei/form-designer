import React, {PureComponent} from 'react'
import {Card, Divider} from 'antd';
import FormView from './FormView';
import componentStyle from './component.less';
import FormEditor from './FormEditor';
import FormStudio from "../../../src/FormStudio";
import {Component, FactoryGroup} from "../../../src/types";
import {draggable} from "../lib/sortable";

require('./component.less')

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

    componentDidMount() {

    }


    renderChild(group: FactoryGroup) {
        return FormStudio.getFactoryList(group).filter(item => item.type !== 'LinearLayout').map(item => {
            return <FormComponent title={item.title} type={item.type} key={item.type}/>
        })
    }

    render() {
        return (
            <div className="form-designer">
                <Card bordered>
                    <div className={componentStyle.widgetList}>
                        <Divider>{"表单组件"}</Divider>
                        {this.renderChild(FactoryGroup.Component)}
                        <Divider>{"布局"}</Divider>
                        {this.renderChild(FactoryGroup.Layout)}
                    </div>
                </Card>

                <div>
                    <FormView formDefinition={{description: '', width: ''}}/>
                </div>

                <Card bordered style={{flexGrow: 1}} title="属性编辑">
                    <FormEditor/>
                </Card>
            </div>
        );
    }
}

export default FormDesigner;
