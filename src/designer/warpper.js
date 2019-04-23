import React from 'react';
import {Form} from 'antd';
import FormStudio from '../util/FormStudio';


export function ComponentEditor(WrappedComponent){

  return Form.create({
    onValuesChange(props, values, allValues) {
      if(props.onValuesChange){// PropsEditor#onValuesChange
        props.onValuesChange(props, values, allValues)
      }
    }
  })(WrappedComponent);
}


/**
 * 注册ComponentFactory
 * @param Factory
 * @constructor
 */
export function FactoryRegister(Component, ComponentEditor){

  return function FactoryWrapper(Factory){
    if(Component){
      Factory.prototype.renderComponenet =(componentDefinition)=>{
        return function(props) {
          return <Component {...props} definition={componentDefinition} />
        }
      };
    }

    if(ComponentEditor){
      Factory.prototype.renderEditor = (componentDefinition)=>{
        return function(props){
          return <ComponentEditor {...props} definition={componentDefinition} />
        }
      }
    }


    FormStudio.registerFactory(new Factory())
  }
}
