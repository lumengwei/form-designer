import { ComponentFactory, FactoryGroup } from '../types';
import { makeComponentId } from '../utils';

class ColumnLayoutFactory implements ComponentFactory<'ColumnLayout'> {
  readonly type: 'ColumnLayout' = 'ColumnLayout';
  readonly group = FactoryGroup.Layout;
  title = '列布局';

  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition() {
    return {
      id: makeComponentId(),
      type: this.type,
      title: this.title,
      props: {
        columnNum: 2,
      },
      children: [],
    };
  }
}

export default new ColumnLayoutFactory();
