export interface Component {
    title: string;
    readonly type: string;
}

export interface FormDefinition {
    description: string;
    width: string;
}

/**
 * 字段定义
 */
export interface FieldDefinition {
    fieldId: string;
    fieldName: string;
    fieldType: string;
}

/**
 * 组件定义
 */
export interface ComponentDefinition<T> extends Component {
    /**
     * 作为一个子组件时，所在父组件中的位置（这个数据不一定在父组件中起作用）
     */
    id: string;
    slot?: number;
    props?: T;
    children?: ComponentDefinition<any>[];
    fieldDef?: FieldDefinition;
    rules?: FieldRule[];
}


export enum FactoryGroup {
    'Layout' = '布局组件',
    'Component' = '表单组件'
}

/**
 * 组件工厂
 * 负责创建组件的定义
 */
export interface ComponentFactory<T> extends Component {
    readonly group: FactoryGroup;

    createComponentDefinition: () => ComponentDefinition<T>;
}

export interface ComponentFactoryConstructor<T> {
    new(): ComponentFactory<T>;
}

export type FieldRuleType =
    'string'
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
