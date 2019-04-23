import React,{PureComponent} from 'react';
import { Rate, Form, InputNumber } from 'antd';
import { ComponentEditor, FactoryRegister } from '../warpper';
import {Component} from '../component';
import ComponentWrapper from './ComponentWrapper';
import { getErasure } from '../../util/MiscUtil';
import { PropsEditor} from '../fragements';

@ComponentWrapper
class RateComponent extends Component{

  render(){
    const { definition :{props}, renderCounter} = this.props;
    return (
      <Rate
        count={props.count}
        renderCounter={renderCounter}
      />
    )
  }
}

@ComponentEditor
class RateComponentEditor extends PureComponent{


  onChange(_, allValues){
    const { definition:{props}, definition } = this.props;
    definition.name = getErasure(allValues, 'name');
    definition.title = getErasure(allValues, 'title');
    Object.assign(props, allValues);

    return true;
  }

  render(){
    const {form:{getFieldDecorator}, definition:{props}} = this.props;

   return (
     <PropsEditor {...this.props}>
       <Form.Item label="总数 1~10">
         {getFieldDecorator(`count`,
           {
             initialValue: props.count,
             rules:[{
               type:'number',
               min:1,
               message:'不得小于1'
             },{
               type:'number',
               max:10,
               message:'不得大于10'
             }]
           })(<InputNumber />)}
       </Form.Item>
     </PropsEditor>
   );
  }
}

@FactoryRegister(RateComponent, RateComponentEditor)
class RateFactory {
  type="Rate"

  title="评分"

  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition(){
    return {
      type: this.type,
      title: this.title,
      props:{
        count:5
      },
    }
  }
}


export default RateFactory

