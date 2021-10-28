import React, { PureComponent } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Checkbox, Input, Button } from 'antd';
import { ComponentEditor, FactoryRegister } from '../warpper';
import { Component } from '../component';
import ComponentWrapper from './ComponentWrapper';
import { getErasure } from '../../util/MiscUtil';
import { PropsEditor } from '../fragements';
import Factory from './Factory'

const CheckboxGroup = Checkbox.Group;

@ComponentWrapper()
class CheckboxComponent extends Component {
  render() {
    const {
      definition: { id, name, props },
      renderCounter,
      // form: { getFieldDecorator },
    } = this.props;
    const defaultValue = props.options.filter(item => item.checked).map(item => item.value);
    return (
      <Form.Item name={name || id} noStyle>
        <CheckboxGroup options={props.options} value={defaultValue}
          renderCounter={renderCounter} />,
      </Form.Item>
    )
  }
}

@ComponentEditor
class CheckboxComponentEditor extends PureComponent {
  onChange(_, allValues) {
    const {
      definition: { props },
      definition,
    } = this.props;
    definition.name = getErasure(allValues, 'name');
    definition.title = getErasure(allValues, 'title');
    Object.assign(props, allValues);

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
            initialValue: item.value,
          })(<Input />)}
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', marginBottom: 0, marginRight: '3px' }}>
          {getFieldDecorator(`options[${index}].checked`, {
            initialValue: item.checked,
          })(<Checkbox />)}
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', marginBottom: 0, marginRight: '3px' }}>
          {getFieldDecorator(`options[${index}].disabled`, {
            initialValue: item.disabled,
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

@FactoryRegister(CheckboxComponent, CheckboxComponentEditor)
class CheckboxFactory extends Factory {
  groupType = 'base';

  type = 'Checkbox';

  title = '多选框';

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

export default CheckboxFactory;
