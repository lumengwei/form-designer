import React from 'react';
import {sortable} from '@/designer/lib/sortable';
import {Layout} from '../ReactComponent';
import {FactoryRegister, LayoutWrapper} from '../wrapper';
import {ComponentDefinition} from "@@/types";
import {ReactComponentGroupState, ReactComponentProps} from "../types";
import FactoryRenders from "../helper/FactoryRenders";
import className from "classnames";
import LinearLayoutFactory from "@@/factory/LinearLayoutFactory";

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
class LinearLayout extends Layout<ReactComponentProps<'LinearLayout'>,
    'LinearLayout'
    , ReactComponentGroupState<'LinearLayout'>> {

    private _node: HTMLElement | null = null;

    override componentDidMount() {
        sortable(this._node, this, {});
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

    override render() {
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

FactoryRegister(LinearLayout)(LinearLayoutFactory)

