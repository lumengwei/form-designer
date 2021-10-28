import React, { PureComponent } from 'react';
import { Card } from 'antd';
import _ from 'lodash'
import Sortable from '../lib/Sortable';
// import $ from '../lib/jquery';
import FormView from './FormView';
import FormStudio from '../util/FormStudio';
import FormEditor from './FormEditor';
import './formView.less';
import './component.less';

require('./components');

require('./layout');

const group = {
  base: '基础',
  other: '其他',
  layout: '布局',
};

class FormComponent extends PureComponent {
  ref = node => {
    this.node = node;
  };

  render() {
    const { component } = this.props;
    return (
      <div
        // draggable
        className="widgetItem"
        onMouseDown={() => {
          // console.log('移动')
          // onMouseDown(component.type)
        }}
        ref={this.ref}
        key={component.type}
      >
        {component.title}
      </div>
    );
  }
}


class FormDesigner extends PureComponent {
  onMouseDown = componentType => {
    this.setState({ dragVisible: true });
    console.log(componentType);
  };

  onMouseUp = componentType => {
    // this.setState({dragVisible:false});
    console.log(componentType);
  };

  renderChild() {
    return Object.entries(
      FormStudio.factoryFilter(item => item.type !== 'LinearLayout').reduce((total, item) => {
        const groupType = item.groupType || 'other';
        if (!total[groupType]) {
          total[groupType] = [];
        }
        total[groupType].push(item);
        return total;
      }, {}),
    ).map(([groupType, items], index) => (
      <div key={index.toString()}>
        <p className={'widgetTitle'}>{group[groupType]}</p>
        <Sortable className={'widgetList'}
          options={{
            sort: false,
            group: { name: 'form', pull: 'clone', put: false },
            onStart: evt => {
              FormStudio.draggedFactory = items[evt.oldIndex];
            },
            onEnd: () => {
              FormStudio.draggedFactory = null
            },
          }}
          >
          {items.map(item => (
            <FormComponent
              component={item}
              key={_.uniqueId()}
              onMouseDown={this.onMouseDown}
              onMouseUp={this.onMouseUp}
            />
          ))}
        </Sortable>
      </div>
    ));
  }

  render() {
    return (
      <div className="form-designer" style={{ minWidth: '1028px', minHeight: '800px' }}>
        <Card bordered type="card" bodyStyle={{ padding: '10px 0px' }}>
          <div>{this.renderChild()}</div>
        </Card>

        <div style={{ flexGrow: 1, margin: '0 15px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.4)' }}>
          <FormView style={{ height: '100%' }} edit formDefinition={{ ...this.props.formDefinition }} />
        </div>

        <Card bordered style={{ width: '280px' }} type="card" title="属性编辑">
          <FormEditor />
        </Card>
      </div>
    );
  }
}

export default FormDesigner;
