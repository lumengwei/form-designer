import React from 'react';
import {Icon} from 'antd';
import className from 'classnames';
import createReactClass from 'create-react-class';
import FormStudio from '../../util/FormStudio';

const hoistNonReactStatics = require('hoist-non-react-statics');

function ComponentWrapper(WrappedComponent){
  // noinspection JSAnnotator
  const componentLayout = createReactClass({
    displayName: 'ComponentWrapper',
    getInitialState(){
      return {
        renderCounter:0,
        active:false
      }
    },

    /**
     * shouldComponentUpdate 默认不是对象的深层比较，采用标志位的方式
     * 此方法代替foreUpdate
     */
    forceRender(){
      const {renderCounter} = this.state;
      this.setState({
        renderCounter:(renderCounter || 0)+1
      });
    },

    onActive(e){
      if(e){
        e.stopPropagation();
      }

      if(FormStudio.activeComponent){
        FormStudio.activeComponent.unActive();
      }

      FormStudio.activeComponent = this;

      this.setState({
        active: true
      })
    },
    unActive(){
      this.setState({
        active: false
      })
    },
    getWrappedInstance(){
      return this.wrappedInstance;
    },
    setWrappedInstance(ref){
      this.wrappedInstance = ref;
    },
    render(){
      const {active, renderCounter} = this.state;
      const {definition} =this.props;
      return (
        <div className={className({'component':true, 'component-field':true, 'active':active})} onClick={this.onActive}>
          <span className="fm-btn-remove">
            <Icon type="close-circle" />
          </span>
          <div>
            <div className="field-title">
              <span>{definition.title}</span>
            </div>
            <div className="field-content">
              <WrappedComponent {...this.props} definition={definition} renderCounter={renderCounter} ref={this.setWrappedInstance} />
            </div>
          </div>
        </div>
      );
    }
  });

  componentLayout.displayName = `ComponentWrapper(${WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent'})`;

  return hoistNonReactStatics(componentLayout, WrappedComponent);
}

export default ComponentWrapper;
