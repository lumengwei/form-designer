import React, {ComponentClass, ComponentSpec, PureComponent} from 'react';
import className from 'classnames';
import createReactClass from 'create-react-class';
import {Activatable, ReactComponentProps} from "../types";
import {DeleteOutlined, DragOutlined} from "@ant-design/icons";
import {FormHelper} from "../helper";

const hoistNonReactStatics = require('hoist-non-react-statics');

interface LayoutToolbarProps {
    disable?: boolean;

    onRemove?(): void;
}

class LayoutToolbar extends PureComponent<LayoutToolbarProps> {
    onDelete(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        const {onRemove} = this.props;
        if (onRemove) {
            onRemove()
        }
    }

    override render() {
        const {disable} = this.props;

        if (disable) {
            return;
        }

        return (
            <>
                <div className="layout-tool-bar">
                    <span className='fm-btn' title="拖动">
                        <DragOutlined/>
                    </span>
                    <span className='fm-btn fm-btn-del' onClick={(e) => this.onDelete(e)} title="删除">
                        <DeleteOutlined/>
                    </span>
                </div>
            </>
        )
    }
}

export interface FactoryWrapperOptions {
    focusAble?: boolean;
    toolbarAble?: boolean;
    layoutStyle?: any;
}

function LayoutWrapperFactory(opt: FactoryWrapperOptions = {}) {
    const options = opt || {};

    return function LayoutWrapper<T>(WrappedComponent: ComponentClass<ReactComponentProps<T>>) {
        const componentLayout = createReactClass({
            displayName: 'LayoutWrapper',
            getInitialState() {
                return {
                    renderCounter: 0,
                    active: false,
                    focusAble: options.focusAble !== false,   // 是否支持active
                    toolbarAble: options.toolbarAble !== false, // 是否显示toolbar
                    layoutStyle: options.layoutStyle || {}
                }
            },

            /**
             * shouldComponentUpdate 默认不是对象的深层比较，采用标志位的方式
             * 此方法代替foreUpdate
             */
            forceRender() {
                const {renderCounter} = this.state;
                this.setState({
                    renderCounter: (renderCounter || 0) + 1
                })
            },

            onActive() {
                this.setState({
                    active: true
                })
            },

            unActive() {
                this.setState({
                    active: false
                })
            },
            activeClick(e: Event) {
                if (e) {
                    e.stopPropagation();
                }
                const focusAble = this.props.focusAble == undefined ? this.state.focusAble : this.props.focusAble;
                if (focusAble) {
                    FormHelper.activeComponentIns = this;
                }
            },
            getWrappedInstance() {
                return this.wrappedInstance;
            },
            setWrappedInstance(ref: any) {
                this.wrappedInstance = ref;
            },

            onDelete() {
                const {onRemove} = this.props;
                console.log(this, 'onDelete')
                if (onRemove) {
                    onRemove()
                }

                // 如果删除的是当前激活状态的实例，设置null
                if (FormHelper.activeComponentIns == this) {
                    FormHelper.activeComponentIns = null;
                }
            },

            render() {
                const {active, renderCounter, layoutStyle} = this.state;
                const toolbarAble = this.props.toolbarAble == undefined ? this.state.toolbarAble : this.props.toolbarAble
                const {definition} = this.props;
                return (
                    <div style={layoutStyle}
                         className={className({'component': true, 'component-layout': true, 'active': active})}
                         onClick={this.activeClick}>
                        <WrappedComponent {...this.props} definition={definition} renderCounter={renderCounter}
                                          ref={this.setWrappedInstance}/>
                        {toolbarAble ? <LayoutToolbar onRemove={() => this.onDelete()}/> : null}
                    </div>
                );
            }
        } as Activatable & ComponentSpec<any, any>);

        componentLayout.displayName = `LayoutWrapper(${WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent'})`;

        return hoistNonReactStatics(componentLayout, WrappedComponent);

    }
}


export default LayoutWrapperFactory;
