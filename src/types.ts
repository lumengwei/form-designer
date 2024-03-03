import { ComponentProps } from './props';

export interface Component<T extends ComponentType> {
  title: string;
  readonly type: T;
}

export interface FormDefinition {
  title: string;
  description: string;
  width: string;
}

/**
 * 字段定义
 */
export type FieldDefinition = {
  fieldId: string;
  fieldName: string;
  fieldType: FieldType;
  length?: number;
  scale?: number;
};

/**
 * 组件定义
 */
export interface ComponentDefinition<T extends ComponentType> extends Component<T> {
  /**
   * 作为一个子组件时，所在父组件中的位置（这个数据不一定在父组件中起作用）
   */
  id: string;
  slot?: number;
  props?: ComponentProps[T];
  children?: ComponentDefinition<any>[];
  title: string;
  fieldDef?: FieldDefinition;
  rules?: FieldRule[];
}

export enum FactoryGroup {
  'Layout' = 'Layout',
  'Component' = 'Component',
}

export type ComponentType = keyof ComponentProps;

/**
 * 组件工厂
 * 负责创建组件的定义
 */
export interface ComponentFactory<T extends ComponentType> extends Component<T> {
  readonly group: FactoryGroup;

  createComponentDefinition: () => ComponentDefinition<T>;
}

/**
 * 组件工厂
 * 负责创建组件的定义
 */
export interface FieldFactory<T extends ComponentType> extends ComponentFactory<T> {
  readonly group: FactoryGroup;

  createComponentDefinition: () => ComponentDefinition<T> & {
    fieldDef: FieldDefinition;
  };
}

export interface ComponentFactoryConstructor<T extends ComponentType> {
  new (): ComponentFactory<T>;
}

export const FieldTypes:Record<string, string> = {
  string: 'STRING',
  timestamp: 'TIMESTAMP',
  date: 'DATE',
  varchar: 'VARCHAR',
  decimal: 'DECIMAL',
  int8: 'INT8',
  int16: 'INT16',
  int32: 'INT32',
  int64: 'INT64',
  boolean: 'BOOLEAN',
  array: 'ARRAY',
};

export type FieldType = keyof typeof FieldTypes;

export type FieldRuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email';

export interface FieldRule {
  type?: FieldRuleType;
  len?: number;
  max?: number;
  min: number;
  message: string;
}
