import React,{PureComponent} from 'react';
import { Radio, Form, Input, Button, Checkbox, } from 'antd';
import { ComponentEditor, FactoryRegister } from '../warpper';
import {Component} from '../component';
import ComponentWrapper from './ComponentWrapper';
import { getErasure } from '../../util/MiscUtil';
import { PropsEditor} from '../fragements';

const RadioGroup = Radio.Group;

@ComponentWrapper
class RadioComponent extends Component{

  render(){
    const { definition :{props}, renderCounter} = this.props;
    const defaultValue = props.options.filter(item=>{
      return item.checked;
    }).map(item=>{
      return item.value;
    })[0];

    return (
      <RadioGroup options={props.options} value={defaultValue} renderCounter={renderCounter} />
    )
  }
}

@ComponentEditor
class RadioComponentEditor extends PureComponent{


  onChange(_, allValues){
    const { definition:{props}, definition } = this.props;
    definition.name = getErasure(allValues, 'name');
    definition.title = getErasure(allValues, 'title');
    const checkIndex = getErasure(allValues, 'checkedIndex');
    Object.assign(props, allValues);

    props.options.forEach(item=>{
      item.checked = false;
    });

    if(checkIndex !== undefined){
      props.options[checkIndex].checked = true;
    }

    return true;
  }

  removeOption=(index)=>{
    const {definition:{props:{options}}, componentIns} = this.props;
    options.splice(index,1);
    this.forceUpdate();
    componentIns.forceRender();
  }

  addOption=(index)=>{
    const {definition:{props:{options}}, componentIns} = this.props;
    options.splice(index+1,0, {label:`显示值${index+1}`, value:`真值${index+1}`})
    this.forceUpdate();
    componentIns.forceRender();
  }

  renderOptions(){
    const {definition:{props:{options}}, form:{getFieldDecorator}} = this.props;
    return options.map((item, index)=>{
      return (
        <Form.Item
          label={index!==0?null:"可选值：显示值 -- 真值 -- 默认-- 禁用"}
          style={{ marginBottom: 0 }}
        >
          <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 55px)', marginBottom:0, marginRight:'3px' }}>
            {getFieldDecorator(`options[${index}].label`,{
              initialValue: item.label
            })(<Input />)}
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 55px)', marginBottom:0 , marginRight:'3px'}}>
            {getFieldDecorator(`options[${index}].value`,
              {
                initialValue: item.value
              })(<Input />)}
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', marginBottom:0 , marginRight:'3px'}}>
            {getFieldDecorator(`checkedIndex`)(<RadioGroup name='checkedIndex'>
              <Radio value={index} />
            </RadioGroup>)}
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', marginBottom:0 , marginRight:'3px'}}>
            {getFieldDecorator(`options[${index}].disabled`,
              {
                initialValue: item.disabled
              })(<Checkbox />)}
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: '48px', marginBottom:0 }}>
            <Button type="primary" shape="circle" icon="plus" size="small" onClick={()=>this.addOption(index)} />
            {index !== 0?(<Button type="danger" shape="circle" icon="minus" size="small" onClick={()=>this.removeOption(index)} />
            ):null}
          </Form.Item>
        </Form.Item>
      );
    })
  }

  render(){
   return (
     <PropsEditor {...this.props}>
       {this.renderOptions()}
     </PropsEditor>
   );
  }
}

@FactoryRegister(RadioComponent, RadioComponentEditor)
class RadioFactory {
  type="Radio"

  title="单选框"

  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition(){
    return {
      type: this.type,
      title: this.title,
      props:{
        placeholder: '请输入',
        options:[
          { label: '显示值', value: '真值', checked:false }
        ]
      },
    }
  }
}


export default RadioFactory;

