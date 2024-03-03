import { FactoryGroup, FieldFactory, FieldType } from '../types';
import { makeComponentId, makeFieldId } from '../utils';

class TextAreaFactory implements FieldFactory<'TextArea'> {
  readonly type: 'TextArea' = 'TextArea';
  readonly group = FactoryGroup.Component;
  title = '多行输入框';

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
        fieldType: 'varchar' as FieldType,
        fieldName: '',
      },
      props: {
        placeholder: '请输入',
      },
    };
  }
}

export default new TextAreaFactory();
