import { ComponentFactory, FactoryGroup } from '../types';
import { makeComponentId } from '../utils';
import { LinearLayoutProps } from '@@/props';

class LinearLayoutFactory implements ComponentFactory<'LinearLayout'> {
  readonly type: 'LinearLayout' = 'LinearLayout';
  readonly group = FactoryGroup.Layout;
  title = '流式布局';

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
        direction: 'column' as LinearLayoutProps['direction'],
      },
      children: [],
    };
  }
}

export default new LinearLayoutFactory();
