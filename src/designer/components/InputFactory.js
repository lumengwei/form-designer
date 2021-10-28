import React, { PureComponent } from 'react';
import { Input, Form, message } from 'antd';
import { ComponentEditor, FactoryRegister } from '../warpper';
import { Component } from '../component';
import ComponentWrapper from './ComponentWrapper';
import { guaranteeNumber, isNull, getErasure } from '../../util/MiscUtil';
import { PropsEditor } from '../fragements';
import Factory from './Factory'

/**
 * 组件
 */
@ComponentWrapper
class InputComponent extends Component {
  render() {
    const {
      definition: { id, name, props },
    } = this.props;
    return (
      <Form.Item name={name || id} noStyle>
        <Input placeholder={props.placeholder} />
      </Form.Item>
    )
    // return getFieldDecorator(name || id, {
    // })(<Input placeholder={props.placeholder} />);
  }
}

/**
 * 组件属性编辑器
 */
@ComponentEditor
class InputComponentEditor extends PureComponent {
  /**
   * 当编辑器改变时，此方法被调用
   * @param _
   * @param allValues
   * @returns {boolean}
   */
  onChange(_, allValues) {
    if (
      !isNull(allValues.minLength, allValues.maxLength) &&
      allValues.minLength > allValues.maxLength
    ) {
      message.warn(`最小长度${allValues.minLength}应该小于最大长度${allValues.maxLength}`);
      return false;
    }

    const {
      definition: { props },
      definition,
    } = this.props;
    definition.name = getErasure(allValues, 'name');
    definition.title = getErasure(allValues, 'title');
    Object.assign(props, allValues);
    props.minLength = guaranteeNumber(props.minLength, 0, Number.MAX_VALUE);
    props.maxLength = guaranteeNumber(props.maxLength, 0, Number.MAX_VALUE);

    return true;
  }

  render() {
    return <PropsEditor {...this.props} lengthLimit placeholder />;
  }
}

/**
 * 组件工厂
 */
@FactoryRegister(InputComponent, InputComponentEditor)
class InputFactory extends Factory {
  groupType = 'base';

  type = 'string';

  title = '单行输入框';

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
      },
    };
  }
}

export default InputFactory;
