import React from 'react';
import className from 'classnames';
import createReactClass from 'create-react-class';
import { CloseCircleOutlined } from '@ant-design/icons';
import FormStudio from '../../util/FormStudio';
import LayoutToolbar from './LayoutToolbar';
import FormViewContext from '../FormViewContext';

const hoistNonReactStatics = require('hoist-non-react-statics');

function LayoutWrapperFactory(opt) {
  const options = opt || {};
  return function LayoutWrapper(WrappedComponent) {
    // noinspection JSAnnotator
    const componentLayout = createReactClass({
      displayName: 'LayoutWrapper',
      getInitialState() {
        return {
          renderCounter: 0,
          active: false,
          focusAble: options.focusAble !== false, // 是否支持active
          toolbarAble: options.toolbarAble !== false, // 是否显示toolbar
          layoutStyle: options.layoutStyle || {},
          removeBtn: options.removeBtn === true,
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
      componentWillUnmount() {
        if (this.state.active) {
          FormStudio.activeComponent = null;
        }
      },
      onActive(e) {
        if (e) {
          e.stopPropagation();
        }

        const { focusAble } = this.state;
        if (!focusAble) {
          return;
        }
        if (FormStudio.activeComponent) {
          FormStudio.activeComponent.unActive();
        }

        FormStudio.activeComponent = this;

        this.setState({
          active: true,
        });
      },

      unActive() {
        const { focusAble } = this.state;
        if (focusAble) {
          this.setState({
            active: false,
          });
        }
      },
      getWrappedInstance() {
        return this.wrappedInstance;
      },
      setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      },
      render() {
        const {
          active,
          renderCounter,
          focusAble,
          toolbarAble,
          removeBtn,
          layoutStyle,
        } = this.state;
        const { definition } = this.props;
        return (
          <FormViewContext.Consumer>
            {({ edit }) => (
              <div
                style={layoutStyle}
                className={className({ component: true, 'component-layout': edit, active })}
                onClick={focusAble && edit ? this.onActive : null}
              >
                {removeBtn && (
                  <span className="fm-btn-remove">
                    <CloseCircleOutlined />
                  </span>
                )}
                <WrappedComponent
                  {...this.props}
                  definition={definition}
                  renderCounter={renderCounter}
                  ref={this.setWrappedInstance}
                />
                {toolbarAble && edit ? <LayoutToolbar /> : null}
              </div>
            )}
          </FormViewContext.Consumer>
        );
      },
    });

    componentLayout.displayName = `LayoutWrapper(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'WrappedComponent'})`;

    return hoistNonReactStatics(componentLayout, WrappedComponent);
  };
}

export default LayoutWrapperFactory;
