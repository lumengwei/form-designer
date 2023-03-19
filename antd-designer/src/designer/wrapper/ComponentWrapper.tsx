import React, {ComponentClass, ComponentSpec} from 'react';
import {CloseCircleOutlined} from '@ant-design/icons';
import className from 'classnames';
import createReactClass from 'create-react-class';
import {Activatable, ReactComponentProps} from "../types";
import {FormHelper} from "../helper";

const hoistNonReactStatics = require('hoist-non-react-statics');

function ComponentWrapper<T>(WrappedComponent: ComponentClass<ReactComponentProps<T>>) {
    const componentLayout = createReactClass({
        displayName: 'ComponentWrapper',
        getInitialState() {
            return {
                renderCounter: 0,
                active: false
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
            });
        },

        onActive() {
            this.setState({
                active: true
            });
        },
        unActive() {
            this.setState({
                active: false
            })
        },

        getWrappedInstance() {
            return this.wrappedInstance;
        },
        setWrappedInstance(ref: any) {
            this.wrappedInstance = ref;
        },

        renderDel() {
            const {active} = this.state;
            if (active) {
                return (
                    <>
                     <span className="fm-btn-remove">
                              <CloseCircleOutlined/>
                            </span>
                    </>
                )
            } else {
                return;
            }
        },
        activeClick(e: Event) {
            if (e) {
                e.stopPropagation();
            }
            FormHelper.activeComponentIns = this;
        },
        render() {
            const {active, renderCounter} = this.state;
            const {definition} = this.props;
            return (
                <>
                    <div className={className({'component': true, 'component-field': true, 'active': active})}
                         onClick={this.activeClick}>
                        {this.renderDel()}
                        <div>
                            <div className="field-title">
                                <span>{definition.title}</span>
                            </div>
                            <div className="field-content">
                                <WrappedComponent
                                    {...this.props}
                                    definition={definition}
                                    renderCounter={renderCounter}
                                    ref={this.setWrappedInstance}/>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    } as Activatable & ComponentSpec<any, any>);

    componentLayout.displayName = `ComponentWrapper(${WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent'})`;

    return hoistNonReactStatics(componentLayout, WrappedComponent);
}

export default ComponentWrapper;
