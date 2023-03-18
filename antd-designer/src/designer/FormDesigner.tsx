import React, {PureComponent} from 'react'
import {Card} from 'antd';
import $ from '../lib/jquery';
import FormView from './FormView';
import componentStyle from './component.less';
import PropsEditor from './PropsEditor';
import FormStudio from "../../../src/FormStudio";
import {Component} from "../../../src/types";

require('./components');

require('./layout');

class FormComponent extends PureComponent<Component> {

    private _node: HTMLElement | null = null;

    ref = (node: HTMLElement | null) => {
        this._node = node;
    }

    componentDidMount() {
        const {type} = this.props;

        // @ts-ignore
        $(this._node).draggable({
            connectToSortable: ".ui-sortable",
            helper: "clone",
            opacity: .8,
            appendTo: "body",
            start() {
                FormStudio.draggedFactory = FormStudio.getFactory(type);
            },
            stop() {
                FormStudio.draggedFactory = null;
            }
        }).disableSelection();
    }

    render() {
        const {type, title} = this.props;
        return (
            <div
                draggable
                className={componentStyle.widgetItem}
                ref={this.ref}
                key={type}
            >
                {title}
            </div>
        )
    }
}


class FormDesigner extends PureComponent {

    componentDidMount() {

    }


    renderChild() {
        return FormStudio.factoryFilter(item => item.type !== 'LinearLayout').map(item => {
            return <FormComponent title={item.title} type={item.type}/>
        })
    }

    render() {
        return (
            <div className="form-designer">
                <Card bordered>
                    <div
                        className={componentStyle.widgetList}
                    >
                        {this.renderChild()}
                    </div>
                </Card>

                <div>
                    <FormView formDefinition={{description: '', width: ''}}/>
                </div>

                <Card bordered style={{flexGrow: 1}} title="属性编辑">
                    <PropsEditor/>
                </Card>
            </div>
        );
    }
}

export default FormDesigner;
