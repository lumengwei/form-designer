import React, { PureComponent } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import * as Antd from 'antd';
import { ComponentEditor, FactoryRegister } from '../warpper';
import { Layout } from '../component';
import { guaranteeNumber, getErasure } from '../../util/MiscUtil';
import LayoutWrapper from './LayoutWrapper';

@LayoutWrapper({
  toolbarAble: false,
  removeBtn: true,
})
class DividerLayout extends Layout {
  render() {
    const { definition } = this.props;
    return (
      <Antd.Divider style={{ margin: '16px 0' }} orientation={definition.props.orientation}>
        {definition.title}
      </Antd.Divider>
    );
  }
}

@ComponentEditor
class DividerComponentEditor extends PureComponent {
  onChange(_, allValues) {
    const {
      definition: { props },
      definition,
    } = this.props;
    Object.assign(props, allValues);
    definition.title = getErasure(allValues, 'title');
    props.columnNum = guaranteeNumber(props.columnNum, 0, 10);
  }

  render() {
    const {
      form: { getFieldDecorator },
      definition,
    } = this.props;
    return (
      <Form>
        <Form.Item label="标题" style={{ marginBottom: 0 }}>
          {getFieldDecorator('title', {
            initialValue: definition.title,
          })(<Antd.Input placeholder="标题" />)}
        </Form.Item>
      </Form>
    );
  }
}

@FactoryRegister(DividerLayout, DividerComponentEditor)
class DividerLayoutFactory {
  groupType = 'layout';

  type = 'DividerLayout';

  title = '分割线';

  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition() {
    return {
      type: this.type,
      title: this.title,
      props: {
        orientation: 'left',
      },
      children: [],
    };
  }
}

export default DividerLayoutFactory;
