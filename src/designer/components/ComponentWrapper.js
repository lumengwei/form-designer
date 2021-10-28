import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import className from 'classnames';
import createReactClass from 'create-react-class';
import FormStudio from '../../util/FormStudio';
import FormViewContext from '../FormViewContext';

const hoistNonReactStatics = require('hoist-non-react-statics');

function componentWrapper(WrappedComponent) {
  // noinspection JSAnnotator
  const componentLayout = createReactClass({
    displayName: 'ComponentWrapper',
    getInitialState() {
      return {
        renderCounter: 0,
        active: false,
      };
    },

    /**
     * shouldComponentUpdate 默认不是对象的深层比较，采用标志位的方式
     * 此方法代替foreUpdate
     */
    forceRender() {
      const { renderCounter } = this.state;
      this.setState({
        renderCounter: (renderCounter || 0) + 1,
      });
    },
    onActive(e) {
      if (e) {
        e.stopPropagation();
      }

      if (FormStudio.activeComponent) {
        FormStudio.activeComponent.unActive();
      }

      FormStudio.activeComponent = this;

      this.setState({
        active: true,
      });
    },
    componentWillUnmount() {
      if (this.state.active) {
        FormStudio.activeComponent = null;
      }
    },
    unActive() {
      this.setState({
        active: false,
      });
    },
    getWrappedInstance() {
      return this.wrappedInstance;
    },
    setWrappedInstance(ref) {
      this.wrappedInstance = ref;
    },
    render() {
      const { active, renderCounter } = this.state;
      const { definition } = this.props;
      console.log(this.props)
      return (
        <FormViewContext.Consumer>
          {({ edit, form }) => (
            <div
              className={className({ component: true, 'component-field': true, active })}
              onClick={e => {
                e.stopPropagation();
                if (edit) {
                  this.onActive();
                }
              }}
            >
              <span className="fm-btn-remove">
                <CloseCircleOutlined />
              </span>
              <div>
                <div className="field-title">
                  <span>{definition.title}</span>
                </div>
                <div className="field-content">
                  <WrappedComponent
                    {...this.props}
                    definition={definition}
                    form={form}
                    renderCounter={renderCounter}
                    ref={this.setWrappedInstance}
                  />
                </div>
              </div>
            </div>
          )}
        </FormViewContext.Consumer>
      );
    },
  });

  componentLayout.displayName = `ComponentWrapper(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'WrappedComponent'})`;
  return componentLayout;
}

function ComponentWrapperFactor(options) {
  if (typeof options === 'function') {
    const componentLayout = componentWrapper(options);
    return hoistNonReactStatics(componentLayout, options);
  }
  return function(WrappedComponent) {
    const componentLayout = componentWrapper(WrappedComponent);
    return hoistNonReactStatics(componentLayout, WrappedComponent);
  };
}

export default ComponentWrapperFactor;
