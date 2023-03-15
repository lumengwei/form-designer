export interface Component {
  title: string;
  type: string;
}

export interface TableField {
  fieldName: string;
  fieldType: string;
}

/**
 * 组件定义
 */
export interface ComponentDefinition<T> extends Component {
  props?: T;
  children: ComponentDefinition<any>[];
}

/**
 * 布局工厂
 * 负责创建布局的定义
 */
export interface ComponentFactory<T> extends Component {
  createComponentDefinition: () => ComponentDefinition<T> | TableField;
}
