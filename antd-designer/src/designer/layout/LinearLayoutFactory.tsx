import React from 'react';
import {sortable} from '../../lib/sortable';
import {Layout} from '../ReactComponent';
import {FactoryRegister, LayoutWrapper} from '../wrapper';
import {ComponentDefinition, ComponentFactory, FactoryGroup} from "../../../../src/types";
import {LinearLayoutProps} from "../../../../src/props";
import {ReactComponentGroupState, ReactComponentProps} from "../types";
import FactoryRenders from "../helper/FactoryRenders";
import className from "classnames";
import {makeComponentId} from "../../../../src/utils";

/**
 * 这是一个特殊的布局
 */
@LayoutWrapper({
    focusAble: true,
    toolbarAble: true,
    layoutStyle: {
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
        return definition.children!.map((item, index) => {
            const factory = FactoryRenders.getRender<any>(item.type);
            return factory.renderComponent(item)({
                key: `children-${index}`,
                onRemove: () => {
                    this.removeChild(index)
                }
            });
        });
    }

    render() {
        const {definition} = this.props;
        return (
            <div className={className({
                'ui-sortable': true,
                'flex-row': definition.props?.direction == 'row',
                'flex-column': definition.props?.direction == 'column'
            })} ref={this.ref}>
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
            id: makeComponentId(),
            type: this.type,
            title: this.title,
            props: {
                direction: 'column'
            },
            children: []
        }
    }
}


export default LinearLayoutFactory;

