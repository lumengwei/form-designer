import React, {ComponentClass, PureComponent} from 'react';
import className from 'classnames';
import createReactClass from 'create-react-class';
import {ReactComponentProps} from "../types";
import formViewStyle from "../formView.less";
import {DeleteOutlined, DragOutlined} from "@ant-design/icons";

const hoistNonReactStatics = require('hoist-non-react-statics');

interface LayoutToolbarProps {
    disable?: boolean;

    onRemove?(): void;
}

class LayoutToolbar extends PureComponent<LayoutToolbarProps> {

    render() {
        const {disable, onRemove} = this.props;

        if (disable) {
            return;
        }

        return (
            <div className={formViewStyle.formLayoutToolbar}>
        <span className='fm-btn' title="拖动">
         <DragOutlined/>
        </span>
                <span className='fm-btn fm-btn-del' onClick={onRemove} title="删除">
          <DeleteOutlined/>
        </span>
            </div>
        )
    }
}

function LayoutWrapperFactory(opt: any = {}) {
    const options = opt || {};

    return function LayoutWrapper<T>(WrappedComponent: ComponentClass<ReactComponentProps<T>>) {
        // noinspection JSAnnotator
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

            onActive(e: Event) {
                if (e) {
                    e.stopPropagation();
                }

                const {focusAble} = this.state;
                if (!focusAble) {
                    return;
                }

                // TODO

                this.setState({
                    active: true
                })
            },

            unActive() {
                const {focusAble} = this.state;
                if (focusAble) {
                    this.setState({
                        active: false
                    })
                }
            },
            getWrappedInstance() {
                return this.wrappedInstance;
            },
            setWrappedInstance(ref: any) {
                this.wrappedInstance = ref;
            },
            render() {
                const {active, renderCounter, focusAble, toolbarAble, layoutStyle} = this.state;
                const {definition} = this.props;
                return (
                    <div style={layoutStyle}
                         className={className({'component': true, 'component-layout': true, 'active': active})}
                         onClick={focusAble ? this.onActive : null}>
                        <WrappedComponent {...this.props} definition={definition} renderCounter={renderCounter}
                                          ref={this.setWrappedInstance}/>
                        {toolbarAble ? <LayoutToolbar/> : null}
                    </div>
                );
            }
        });

        componentLayout.displayName = `LayoutWrapper(${WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent'})`;

        return hoistNonReactStatics(componentLayout, WrappedComponent);
    }
}


export default LayoutWrapperFactory;
