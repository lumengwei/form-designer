import React, {PureComponent} from 'react';
import { Form, InputNumber  } from 'antd';
import { ComponentEditor, FactoryRegister } from '../warpper';
import { Layout } from '../component';
import { guaranteeNumber } from '../../util/MiscUtil';
import LayoutWrapper from './LayoutWrapper';
import FormStudio from "../../util/FormStudio";

const LinearLayoutFactory = FormStudio.getFactory("LinearLayout");

@LayoutWrapper()
class ColumnLayout extends Layout{

  renderColumns(){
    const {definition:{children, props:{columnNum}}}= this.props;

    let es = columnNum -children.length;
    if(es !== 0){
      if(es<0){
        es = Math.abs(es);
        children.splice(children.length-es, es);
      }else{
        while(es!==0){
          children.splice(children.length, 0, LinearLayoutFactory.createComponentDefinition());
          es-=1;
        }
      }
    }

    return children.map(item =>{
      return (
        <div className="cell">
          {LinearLayoutFactory.renderComponenet(item)()}
        </div>)
    })

  }

  render (){
    return (
      <div className="column-layout">{this.renderColumns()}</div>
    )
  }
}

@ComponentEditor
class ColumnComponentEditor extends PureComponent{

  onChange(_, allValues){
    const { definition:{props} } = this.props;
    Object.assign(props, allValues);
    props.columnNum = guaranteeNumber(props.columnNum, 0, 10);
  }

  render(){
    const { form:{getFieldDecorator}, definition:{props} } = this.props;
    return (
      <Form>
        <Form.Item label="列数目" style={{ marginBottom:0 }}>
          {getFieldDecorator('columnNum',{
            initialValue: props.columnNum,
              rules:[{
                  type:'number',
                  min:1,
                  message:'不得小于1'
              },{
              type:'number',
              max:10,
              message:'不得小于10'
          }]
          })(<InputNumber />)}
        </Form.Item>
      </Form>);
  }
}

@FactoryRegister(ColumnLayout, ColumnComponentEditor)
class ColumnLayoutFactory{
  type="ColumnLayout"

  title="列布局"


  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition(){
    return {
      type: this.type,
      title: this.title,
      props:{
        'columnNum':2
      },
      children:[
        LinearLayoutFactory.createComponentDefinition(),
        LinearLayoutFactory.createComponentDefinition()
      ]
    }
  }
}


export default ColumnLayoutFactory;

