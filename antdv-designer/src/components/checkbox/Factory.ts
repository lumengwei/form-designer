import {
  ComponentDefinition,
  ComponentFactory,
  TableField,
} from '/@/modules/form/views/designer/types';

export type CheckboxProps = {
  placeholder: string;
  options: {
    label: string;
    value: string;
    checked: boolean;
    disabled: boolean;
  }[];
};

const Factory: ComponentFactory<CheckboxProps> = {
  title: '多选框',
  type: 'Checkbox',
  createComponentDefinition(): ComponentDefinition<CheckboxProps> & TableField {
    return {
      type: this.type,
      title: this.title,
      fieldType: '',
      fieldName: '',
      props: {
        placeholder: '请输入',
        options: [{ label: '显示值', value: '真值', checked: false, disabled: true }],
      },
      children: [],
    };
  },
};

export default Factory;
