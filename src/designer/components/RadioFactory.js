import React, { PureComponent } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Radio, Input, Button, Checkbox } from 'antd';
import { ComponentEditor, FactoryRegister } from '../warpper';
import { Component } from '../component';
import ComponentWrapper from './ComponentWrapper';
import { getErasure } from '../../util/MiscUtil';
import { PropsEditor } from '../fragements';
import Factory from './Factory'

const RadioGroup = Radio.Group;

@ComponentWrapper()
class RadioComponent extends Component {
  render() {
    const {
      definition: { id, name, props },
      renderCounter,
      // form: { getFieldDecorator },
    } = this.props;
    const defaultValue = props.options.filter(item => item.checked).map(item => item.value)[0];
    return (
      <Form.Item name={name || id} initialValue={defaultValue} noStyle>
        <RadioGroup options={props.options} renderCounter={renderCounter} />
      </Form.Item>
    )
  }
}

@ComponentEditor
class RadioComponentEditor extends PureComponent {
  onChange(_, allValues) {
    const {
      definition: { props },
      definition,
    } = this.props;
    definition.name = getErasure(allValues, 'name');
    definition.title = getErasure(allValues, 'title');
    const checkIndex = getErasure(allValues, 'checkedIndex');
    Object.assign(props, allValues);

    props.options.forEach(item => {
      item.checked = false;
    });

    if (checkIndex !== undefined) {
      props.options[checkIndex].checked = true;
    }

    return true;
  }

  removeOption = index => {
    const {
      definition: {
        props: { options },
      },
      componentIns,
    } = this.props;
    options.splice(index, 1);
    this.forceUpdate();
    componentIns.forceRender();
  };

  addOption = index => {
    const {
      definition: {
        props: { options },
      },
      componentIns,
    } = this.props;
    options.splice(index + 1, 0, { label: `显示值${index + 1}`, value: `真值${index + 1}` });
    this.forceUpdate();
    componentIns.forceRender();
  };

  renderOptions() {
    const {
      definition: {
        props: { options },
      },
      form: { getFieldDecorator },
    } = this.props;
    return options.map((item, index) => (
      <Form.Item
        key={index.toString()}
        label={index !== 0 ? null : '可选值：显示值 -- 真值 -- 默认-- 禁用'}
        style={{ marginBottom: 0 }}
      >
        <Form.Item
          style={{
            display: 'inline-block',
            width: 'calc(50% - 55px)',
            marginBottom: 0,
            marginRight: '3px',
          }}
        >
          {getFieldDecorator(`options[${index}].label`, {
            initialValue: item.label,
          })(<Input />)}
        </Form.Item>
        <Form.Item
          style={{
            display: 'inline-block',
            width: 'calc(50% - 55px)',
            marginBottom: 0,
            marginRight: '3px',
          }}
        >
          {getFieldDecorator(`options[${index}].value`, {
            initialValue: index,
          })(<Input />)}
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', marginBottom: 0, marginRight: '3px' }}>
          {getFieldDecorator('checkedIndex')(
            <RadioGroup name="checkedIndex">
              <Radio value={index} />
            </RadioGroup>,
          )}
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', marginBottom: 0, marginRight: '3px' }}>
          {getFieldDecorator(`options[${index}].disabled`, {
            initialValue: item.disabled,
            valuePropName: 'checked',
          })(<Checkbox />)}
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', width: '48px', marginBottom: 0 }}>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="small"
            onClick={() => this.addOption(index)}
          />
          {index !== 0 ? (
            <Button
              type="danger"
              shape="circle"
              icon={<MinusOutlined />}
              size="small"
              onClick={() => this.removeOption(index)}
            />
          ) : null}
        </Form.Item>
      </Form.Item>
    ));
  }

  render() {
    return <PropsEditor {...this.props}>{this.renderOptions()}</PropsEditor>;
  }
}

@FactoryRegister(RadioComponent, RadioComponentEditor)
class RadioFactory extends Factory {
  groupType = 'base';

  type = 'Radio';

  title = '单选框';

  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition() {
    return {
      ...this.baseDefinition(),
      type: this.type,
      title: this.title,
      props: {
        placeholder: '请输入',
        options: [{ label: '显示值', value: '真值', checked: false }],
      },
    };
  }
}

export default RadioFactory;
