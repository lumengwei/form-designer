import React, { PureComponent } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, InputNumber } from 'antd';

export function NameInput(props) {
  return (
    <Form.Item label="名称" style={{ marginBottom: 0 }}>
      {props.getFieldDecorator('name', {
        initialValue: props.value,
        rules: [
          {
            pattern: /^[a-zA-Z_]+/g,
            message: '只能输入字母或下划线',
          },
          {
            max: 30,
            message: '至多输入30个字符',
          },
          {
            min: 5,
            message: '至少输入5个字符',
          },
        ],
      })(<Input placeholder="必须是字母或下划线，长度在5~30" />)}
    </Form.Item>
  );
}

export class PropsEditor extends PureComponent {
  /**
   * 长度限制
   * @returns {*}
   */
  renderLengthLimit() {
    const {
      form: { getFieldDecorator },
      definition: { props },
      lengthLimit,
    } = this.props;
    if (!this.props.hasOwnProperty('lengthLimit')) {
      return null;
    }

    return (
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          label="最小长度"
          style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginBottom: 0 }}
        >
          {getFieldDecorator('minLength', {
            initialValue: props.minLength,
            rules: [
              {
                type: 'number',
                min: 1,
                message: '不得小于1',
              },
            ],
          })(<InputNumber />)}
        </Form.Item>
        <Form.Item
          label="最大长度"
          style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginBottom: 0 }}
        >
          {getFieldDecorator('maxLength', {
            initialValue: props.maxLength,
            rules: [
              {
                type: 'number',
                min: 1,
                message: '不得小于1',
              },
            ],
          })(<InputNumber />)}
        </Form.Item>
      </Form.Item>
    );
  }

  renderPlaceholder() {
    const {
      form: { getFieldDecorator },
      definition: { props },
    } = this.props;

    if (!this.props.hasOwnProperty('placeholder')) {
      return null;
    }

    return (
      <Form.Item label="占位符" style={{ marginBottom: 0 }}>
        {getFieldDecorator('placeholder', {
          initialValue: props.placeholder,
        })(<Input min={1} />)}
      </Form.Item>
    );
  }

  componentDidUpdate() {
    // const { form, definition } = this.props;
    // console.log('渲染属性编辑器', form, definition)
    // form.setFieldsValue({
    //   title: definition.title,
    // })
  }

  render() {
    const {
      form: { getFieldDecorator },
      definition,
      children,
    } = this.props;
    console.log('渲染属性编辑器', definition);
    return (
      <Form>
        <NameInput value={definition.name} getFieldDecorator={getFieldDecorator} />
        <Form.Item label="标题" style={{ marginBottom: 0 }}>
          {getFieldDecorator('title', {
            initialValue: definition.title,
          })(<Input placeholder="标题" />)}
        </Form.Item>
        {this.renderPlaceholder()}
        {this.renderLengthLimit()}
        {children}
      </Form>
    );
  }
}
