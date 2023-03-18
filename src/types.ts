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
    fieldName: string;
    fieldType: string;
}

/**
 * 组件定义
 */
export interface ComponentDefinition<T> extends Component {
    props?: T;
    children?: ComponentDefinition<any>[];
    fieldDef?: FieldDefinition;
    rules?: FieldRule[];
}


/**
 * 组件工厂
 * 负责创建组件的定义
 */
export interface ComponentFactory<T> extends Component {
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
