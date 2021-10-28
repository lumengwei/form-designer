import React, { PureComponent } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { InputNumber } from 'antd';
import * as Antd from 'antd';
import { ComponentEditor, FactoryRegister } from '../warpper';
import { Layout } from '../component';
import { guaranteeNumber } from '../../util/MiscUtil';
import LayoutWrapper from './LayoutWrapper';
import FormStudio from '../../util/FormStudio';

const LinearLayoutFactory = FormStudio.getFactory('LinearLayout');

@LayoutWrapper()
class ColumnLayout extends Layout {
  renderColumns() {
    const {
      definition: {
        children,
        props: { columnNum },
      },
    } = this.props;

    let es = columnNum - children.length;
    if (es !== 0) {
      if (es < 0) {
        es = Math.abs(es);
        children.splice(children.length - es, es);
      } else {
        while (es !== 0) {
          children.splice(children.length, 0, LinearLayoutFactory.createComponentDefinition());
          es -= 1;
        }
      }
    }

    return children.map((item, key) => (
      <Antd.Col key={key.toString()} className="cell" span={12}>
        {LinearLayoutFactory.renderComponenet(item)()}
      </Antd.Col>
    ));
  }

  render() {
    return (
      <Antd.Row className="column-layout" gutter={this.props.gutter}>
        {this.renderColumns()}
      </Antd.Row>
    );
  }
}

@ComponentEditor
class ColumnComponentEditor extends PureComponent {
  onChange(_, allValues) {
    const {
      definition: { props },
    } = this.props;
    Object.assign(props, allValues);
    props.columnNum = guaranteeNumber(props.columnNum, 0, 10);
  }

  render() {
    const {
      form: { getFieldDecorator },
      definition: { props },
    } = this.props;
    return (
      <Form>
        <Form.Item label="列数目" style={{ marginBottom: 0 }}>
          {getFieldDecorator('columnNum', {
            initialValue: props.columnNum,
            rules: [
              {
                type: 'number',
                min: 1,
                message: '不得小于1',
              },
              {
                type: 'number',
                max: 2,
                message: '不得大于2',
              },
            ],
          })(<InputNumber min={1} max={2} style={{ width: '100%' }} />)}
        </Form.Item>

        <Form.Item label="列间隔" style={{ marginBottom: 0 }}>
          {getFieldDecorator('gutter', {
            initialValue: props.gutter,
            rules: [
              {
                type: 'number',
                min: 0,
                message: '不得小于0',
              },
            ],
          })(<InputNumber min={1} style={{ width: '100%' }} />)}
        </Form.Item>
      </Form>
    );
  }
}

@FactoryRegister(ColumnLayout, ColumnComponentEditor)
class ColumnLayoutFactory {
  groupType = 'layout';

  type = 'ColumnLayout';

  title = '列布局';

  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition() {
    return {
      type: this.type,
      title: this.title,
      props: {
        columnNum: 2,
        gutter: 0,
      },
      children: [
        LinearLayoutFactory.createComponentDefinition(),
        LinearLayoutFactory.createComponentDefinition(),
      ],
    };
  }
}

export default ColumnLayoutFactory;
