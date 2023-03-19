import React from 'react';
import {sortable} from '../../lib/sortable';
import {Layout} from '../reactComponent';
import {FactoryRegister, LayoutWrapper} from '../wrapper';
import {ComponentDefinition, ComponentFactory, FactoryGroup} from "../../../../src/types";
import {LinearLayoutProps} from "../../../../src/props";
import {ReactComponentGroupState, ReactComponentProps} from "../types";
import FactoryRenders from "../helper/FactoryRenders";

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
class LinearLayout extends Layout<ReactComponentProps<LinearLayoutProps>,
    LinearLayoutProps
    , ReactComponentGroupState<LinearLayoutProps>> {

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
            const factory = FactoryRenders.getRender<any>(item.type);
            return factory.renderComponent(item)({});
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

@FactoryRegister(LinearLayout)
class LinearLayoutFactory implements ComponentFactory<LinearLayoutProps> {
    readonly type = "LinearLayout"
    readonly group = FactoryGroup.Layout;
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

