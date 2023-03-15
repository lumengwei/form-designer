import React, { PureComponent } from 'react';
import { Form, Input, InputNumber, message } from 'antd';
import { ComponentEditor, FactoryRegister } from '../warpper';
import ComponentWrapper from './ComponentWrapper';
import { Component } from '../component';
import { getErasure, guaranteeNumber, isNull } from '../../util/MiscUtil';
import { NameInput, PropsEditor } from '../fragements';

const TexArea = Input.TextArea;

@ComponentWrapper
class TextAreaComponent extends Component{

  render(){
    const { definition :{props}} = this.props;
    return (
      <TexArea placeholder={props.placeholder} />
    )
  }
}

@ComponentEditor
class TextAreaComponentEditor extends PureComponent{

  onChange(_, allValues){
    if(!isNull(allValues.minLength, allValues.maxLength) && allValues.minLength > allValues.maxLength){
      message.warn(`最小长度${allValues.minLength}应该小于最大长度${allValues.maxLength}`);
      return false;
    }

    const { definition:{props}, definition } = this.props;
    definition.name = getErasure(allValues, 'name');
    definition.title = getErasure(allValues, 'title');
    Object.assign(props, allValues);
    props.minLength = guaranteeNumber(props.minLength, 0, Number.MAX_VALUE);
    props.maxLength = guaranteeNumber(props.maxLength, 0, Number.MAX_VALUE);

    return true;
  }

  render(){
    return (
      <PropsEditor {...this.props} lengthLimit placeholder/>
    );
  }
}

@FactoryRegister(TextAreaComponent, TextAreaComponentEditor)
class TextAreaFactory {
  type="TextArea"

  title="多行输入框"


  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition(){
    return {
      type: this.type,
      title: this.title,
      props:{
        placeholder: '请输入'
      },
    }
  }
}


export default TextAreaFactory;

