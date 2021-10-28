import React, { PureComponent } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import Antd, { Input } from 'antd';
import SortableJS from 'sortablejs';
import cryptoRandomString from 'crypto-random-string';
import { ComponentEditor, FactoryRegister } from '../warpper';
import { Layout } from '../component';
import { getErasure, sorting } from '../../util/MiscUtil';
import LayoutWrapper from './LayoutWrapper';
import FormStudio from '../../util/FormStudio';

const LinearLayoutFactory = FormStudio.getFactory('LinearLayout');

@LayoutWrapper({
  layoutStyle: {
    width: '100%',
  },
})
class TabsLayout extends Layout {
  renderTabs() {
    const {
      definition: {
        children,
        props: { tabNames },
      },
    } = this.props;

    let es = tabNames.length - children.length;
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

    return children.map((item, index) => (
      <Antd.Tabs.TabPane tab={tabNames[index].title} key={index.toString()}>
        {LinearLayoutFactory.renderComponenet(item)()}
      </Antd.Tabs.TabPane>
    ));
  }

  render() {
    return (
      <Antd.Tabs style={{ width: '100%' }} defaultActiveKey="0">
        {this.renderTabs()}
      </Antd.Tabs>
    );
  }
}

@ComponentEditor
class TabsComponentEditor extends PureComponent {
  state = {
    renderCounter: 0,
  };

  onChange(_, allValues) {
    const {
      definition: { props },
    } = this.props;
    Object.assign(props, allValues);
    props.tabNames = getErasure(allValues, 'tabNames');
    this.forceRender();
    return true
  }

  forceRender() {
    const { renderCounter } = this.state;
    this.setState({
      renderCounter: (renderCounter || 0) + 1,
    });
  }

  render() {
    const {
      form: { getFieldDecorator, setFieldsValue },
      definition: { props },
      definition,
    } = this.props;
    return (
      <Form>
        <Form.Item label="便签配置项">
          <div
            ref={node => {
              if (node) {
                SortableJS.create(node, {
                  animation: 150,
                  onUpdate(evt) {
                    sorting(props.tabNames, evt.oldIndex, evt.newIndex);
                    sorting(definition.children, evt.oldIndex, evt.newIndex);
                    setFieldsValue({
                      tabNames: props.tabNames,
                    });
                  },
                });
              }
            }}
          >
            {props.tabNames.map((item, index) => (
              <div key={item.key} data-id={item.key}>
                <Form.Item style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex' }}>
                    <Antd.Icon type="menu" style={{ lineHeight: '32px', marginRight: '10px' }} />
                    {getFieldDecorator(`tabNames[${index}].title`, {
                      initialValue: item.title,
                      rules: [],
                    })(<Input style={{ width: '100%' }} />)}
                    <Antd.Icon style={{ lineHeight: '32px', marginLeft: '5px', cursor: 'pointer' }} type="delete" twoToneColor="red" theme="twoTone" onClick={() => {
                      props.tabNames.splice(index, 1);
                      definition.children.splice(index, 1);
                      FormStudio.propsEditor.forceRender();
                      FormStudio.propsEditor.refreshComponent();
                    }}/>
                  </div>
                </Form.Item>
                <Form.Item style={{ display: 'none' }}>
                  <div style={{ display: 'flex' }}>
                    {getFieldDecorator(`tabNames[${index}].key`, {
                      initialValue: item.key,
                      rules: [],
                    })(<Input style={{ width: '100%' }} />)}
                  </div>
                </Form.Item>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '10px',
            lineHeight: '20px',
            marginLeft: '24px' }}>
            <a onClick={() => {
              props.tabNames.push({
                key: cryptoRandomString(10),
                title: `标签${props.tabNames.length + 1}`,
              });
              definition.children.push(LinearLayoutFactory.createComponentDefinition());
              FormStudio.propsEditor.forceRender();
              FormStudio.propsEditor.refreshComponent();
            }}>
              添加标签
            </a>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

@FactoryRegister(TabsLayout, TabsComponentEditor)
class TabsLayoutFactory {
  groupType = 'layout';

  type = 'TabsLayout';

  title = '标签页';

  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition() {
    return {
      type: this.type,
      title: this.title,
      props: {
        tabNames: [
          {
            key: cryptoRandomString(10),
            title: '标签1',
          },
          {
            key: cryptoRandomString(10),
            title: '标签2',
          },
        ],
      },
      children: [
        LinearLayoutFactory.createComponentDefinition(),
        LinearLayoutFactory.createComponentDefinition(),
      ],
    };
  }
}

export default TabsLayoutFactory;
