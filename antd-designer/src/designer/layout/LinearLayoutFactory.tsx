import React from 'react';
import {FactoryRegister} from '../warpper';
import {sortable} from '../../lib/sortable';
import {Layout} from '../component';
import LayoutWrapper from './LayoutWrapper';
import {ComponentDefinition, ComponentFactory} from "../../../../src/types";
import {LinearLayoutProps} from "../../../../src/props";
import FormStudio from "../../../../src/FormStudio";
import {ComponentFactoryRender} from "../types";

/**
 * 这是一个特殊的布局
 */
@LayoutWrapper({
    focusAble: false, toolbarAble: false, layoutStyle: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        minHeight: '50px',
    }
})
class LinearLayout extends Layout {

    private _node: HTMLElement | null = null;

    componentDidMount() {
        sortable(this._node, this);
    }

    ref = (node: HTMLElement | null) => {
        this._node = node;
    }

    renderChildren() {
        const definition: ComponentDefinition<any> = this.props.definition;
        return definition.children!.map(item => {
            const factory: ComponentFactoryRender<any> = FormStudio.getFactory<any>(item.type);
            return factory.renderComponenet(item)();
        });
    }

    render() {
        return (
            <div className="ui-sortable" ref={this.ref}>
                {this.renderChildren()}
            </div>
        )
    }
}

@FactoryRegister<LinearLayoutProps>(LinearLayout)
class LinearLayoutFactory implements ComponentFactory<LinearLayoutProps> {
    type = "LinearLayout"

    title = "流式布局"


    /**
     * 初始化一个组件定义
     * @returns {{type: string, title: string}}
     */
    createComponentDefinition(): ComponentDefinition<LinearLayoutProps> {
        return {
            type: this.type,
            title: this.title,
            props: {},
            children: []
        }
    }
}


export default LinearLayoutFactory;

