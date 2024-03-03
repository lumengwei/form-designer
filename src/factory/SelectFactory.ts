import { FactoryGroup, FieldFactory, FieldType } from '../types';
import { makeComponentId, makeFieldId } from '../utils';

class SelectFactory implements FieldFactory<'Select'> {
  readonly type: 'Select' = 'Select';
  readonly group = FactoryGroup.Component;
  title = '下拉选择';

  /**
   * 初始化一个组件定义
   * @returns {{type: string, title: string}}
   */
  createComponentDefinition() {
    return {
      id: makeComponentId(),
      type: this.type,
      title: this.title,
      fieldDef: {
        fieldId: makeFieldId(),
        fieldType: '' as FieldType,
        fieldName: '',
      },
      props: {
        placeholder: '请输入',
        options: [{ label: '显示值', value: '真值', checked: false, disabled: false }],
      },
    };
  }
}

export default new SelectFactory();
