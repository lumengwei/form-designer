import React from 'react';
import className from 'classnames';
import createReactClass from 'create-react-class';
import FormStudio from '../../util/FormStudio';
import LayoutToolbar from './LayoutToolbar';

const hoistNonReactStatics = require('hoist-non-react-statics');

function LayoutWrapperFactory(opt){
  const options = opt||{};

  return function LayoutWrapper(WrappedComponent){
    // noinspection JSAnnotator
    const componentLayout = createReactClass({
      displayName: 'LayoutWrapper',
      getInitialState(){
        return {
          renderCounter:0,
          active:false,
          focusAble: options.focusAble !== false,   // 是否支持active
          toolbarAble: options.toolbarAble !== false, // 是否显示toolbar
          layoutStyle: options.layoutStyle ||{}
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
        })
      },

      onActive(e){
        if(e){
          e.stopPropagation();
        }

        const {focusAble} = this.state;
        if(!focusAble){
          return;
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
        const {focusAble} = this.state;
        if(focusAble){
          this.setState({
            active: false
          })
        }
      },
      getWrappedInstance(){
        return this.wrappedInstance;
      },
      setWrappedInstance(ref){
        this.wrappedInstance = ref;
      },
      render(){
        const {active, renderCounter, focusAble, toolbarAble, layoutStyle} = this.state;
        const {definition} =this.props;
        return (
          <div style={layoutStyle} className={className({'component':true, 'component-layout':true, 'active':active})} onClick={focusAble?this.onActive:null}>
            <WrappedComponent {...this.props} definition={definition} renderCounter={renderCounter} ref={this.setWrappedInstance} />
            {toolbarAble?<LayoutToolbar />: null}
          </div>
        );
      }
    });

    componentLayout.displayName = `LayoutWrapper(${WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent'})`;

    return hoistNonReactStatics(componentLayout, WrappedComponent);
  }
}


export default LayoutWrapperFactory;
